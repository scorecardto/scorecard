import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import multiparty from "multiparty";
import {App} from "octokit";
import Expo, {ExpoPushMessage, ExpoPushToken} from "expo-server-sdk";

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
    method,           // 'register' | 'deregister' | 'update'
    fcmToken,
    expoPushToken,
    courseId,
    courseName,       // optional
    onetime           // optional
  } = req.body;

  const decodedToken = await admin.auth().verifyIdToken(fcmToken).catch(() => {
    res.status(200).json({success: false, error: "INVALID_FCM_TOKEN"});
  });

  if (!Expo.isExpoPushToken(expoPushToken)) {
    res.status(200).json({success: false, error: "INVALID_EXPO_PUSH_TOKEN"})
  }

  if (method === 'register') {
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
    const coll = await db
        .collection("notifications")
        .doc("courses")
        .collection(courseId).get();

    let messages = [];
    for (let doc of coll.docs) {
      if (doc.data().onetime) await doc.ref.delete();

      messages.push({
        to: doc.id,
        title: "New Grades",
        body: `New grades have been posted for ${courseName || courseId}`,
        badge: 1,
      });
    }

    let tickets = [];
    for (let chunk of expo.chunkPushNotifications(messages)) {
      tickets.push(...await expo.sendPushNotificationsAsync(chunk));
    }

    for (let ticket of tickets) {
      if (ticket.status === "error" && ticket.details?.error === 'DeviceNotRegistered') {
        await db
            .collection("notifications")
            .doc("courses")
            .collection(courseId)
            .doc(ticket.message).delete();
      }
    }

    res.status(200).json({success: true});
  } else {
    res.status(200).json({success: false, error: "INVALID_METHOD"});
  }
}
