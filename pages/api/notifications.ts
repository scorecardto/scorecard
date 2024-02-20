import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import multiparty from "multiparty";
import {App} from "octokit";
import Expo, {ExpoPushMessage} from "expo-server-sdk";
import axios from "axios";

function randomUUID(){
  // @ts-ignore
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  dotenv.config();

  const firebaseConfig = {
    type: "service_account",
    project_id: "scorecardto",
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  };

  const app = admin.apps.length
    ? admin.app()
    : admin.initializeApp({
        // @ts-ignore
        credential: admin.credential.cert(firebaseConfig),
      });

  const db = getFirestore(app);
  let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

  const {
    method,             // 'isRegistered' | 'register' | 'deregister' | 'update'
    fcmToken,
    expoPushToken,      // not needed for 'update'
    deviceId,           // alternative to expoPushToken; only needed for 'update'
    courseId,
    courseIds,          // only used for 'isRegistered'
    assignmentId,       // only needed for 'update'
    courseName,         // optional
    onetime             // optional
  } = req.body;

  const decodedToken = await admin.auth().verifyIdToken(fcmToken).catch(() => {
    res.status(200).json({success: false, error: "INVALID_FCM_TOKEN"});
  });
  if (!decodedToken) return;

  if (!courseId && (!courseIds || courseIds.find((o: string)=>!o))) {
    res.status(200).json({success: false, error: "INVALID_COURSE_ID"});
    return;
  }

  if (method !== 'update' && !Expo.isExpoPushToken(expoPushToken)) {
    res.status(200).json({success: false, error: "INVALID_EXPO_PUSH_TOKEN"})
    return;
  }

  if (method === 'update' && !deviceId) {
    res.status(200).json({success: false, error: "INVALID_DEVICE_ID"})
    return;
  }

  if (method === 'isRegistered') {

    if (!courseIds) {
      const doc = await db
          .collection("notifications")
          .doc("courses")
          .collection(courseId)
          .doc(expoPushToken)
          .get();

      res.status(200).json({success: true, result: {key: courseId, value: doc.exists ? doc.data()!.onetime ? "ON_ONCE" : "ON_ALWAYS" : "OFF"}});
    } else {
      let result = [];
      for (const id of courseIds) {
        const doc = await db
            .collection("notifications")
            .doc("courses")
            .collection(id)
            .doc(expoPushToken)
            .get();
        result.push({key: id, value: doc.exists ? doc.data()!.onetime ? "ON_ONCE" : "ON_ALWAYS" : "OFF"});
      }

      res.status(200).json({success: true, result});
    }
  } else if (method === 'register') {
    const doc = await db
        .collection("notifications")
        .doc("courses")
        .collection(courseId)
        .doc(expoPushToken).set({
          onetime: onetime || false,
          courseName: courseName ?? "",
        });

    res.status(200).json({success: true});
  } else if (method === 'deregister') {
    const doc = await db
        .collection("notifications")
        .doc("courses")
        .collection(courseId)
        .doc(expoPushToken).delete();

    res.status(200).json({success: true});
  } else if (method === 'update') {
    if (!assignmentId) {
      res.status(200).json({success: false, error: "INVALID_ASSIGNMENT_ID"});
      return;
    }

    const course = db
        .collection("newGradeCounts")
        .doc("courses")
        .collection(courseId);

    if (Date.now() - ((await course.doc("lastNotification").get()).data()?.time ?? 0) < 1000 * 60 * 60 * 12) {
        res.status(200).json({success: true});
        return;
    }

    const assignments = (await course.doc("assignments").get()).data() ?? {};
    assignments[assignmentId] = Array.from(new Set((assignments[assignmentId] ?? []).concat(deviceId)));

    if (assignments[assignmentId].length < 2) {
      await course.doc("assignments").set(assignments);
      res.status(200).json({success: true});
      return;
    }

    await course.doc("assignments").delete();
    await course.doc("lastNotification").set({time: Date.now()});

    const coll = await db
        .collection("notifications")
        .doc("courses")
        .collection(courseId).get();

    let messages: ExpoPushMessage[] = [];

    for (let doc of coll.docs) {
      const data = doc.data();
      if (data.onetime) await doc.ref.delete();

      if (assignments[assignmentId].contains(doc.id)) continue;

      messages.push({
        to: doc.id,
        title: data.courseName || courseId,
        body: 'Other users reported new grades. Tap to check.',
        data: {courseId, displayName: data.courseName || courseId, id: randomUUID()}
      });
    }
    const chunks = expo.chunkPushNotifications(messages);

    let invalidTokens: string[] = [];
    for (let chunk of chunks) {
      const response = (await axios.post("https://exp.host/--/api/v2/push/send",
          chunk.map(m=>{return {to: m.to, _contentAvailable: true, data: m.data}}),
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.EXPO_ACCESS_TOKEN}`
            }
          })).data;
      for (let i = 0; i < response.data.length; i++) {
        const ticket = response.data[i];

        if (ticket.status === "error" && ticket.details.error === 'DeviceNotRegistered') {
          await db
              .collection("notifications")
              .doc("courses")
              .collection(courseId)
              .doc(ticket.details.expoPushToken).delete();

          invalidTokens.push(ticket.details.expoPushToken);
        }
      }
    }

    res.status(200).json({success: true});

    setTimeout(async () => {
      const coll = await db
          .collection("silentPushVerification").get();

      let newMessages: ExpoPushMessage[] = [];
      for (let message of messages) {
        if (invalidTokens.includes(message.to as string)) continue;

        const uuid = (message.data! as any).id;

        if (coll.docs.find(d=> d.id === uuid)) {
          await db
              .collection("silentPushVerification")
              .doc(uuid).delete();
        } else {
          newMessages.push(message);
        }
      }

      for (const chunk of expo.chunkPushNotifications(newMessages)) {
        await expo.sendPushNotificationsAsync(chunk);
      }
    }, 1000 * 4);
  } else {
    res.status(200).json({success: false, error: "INVALID_METHOD"});
  }
}
