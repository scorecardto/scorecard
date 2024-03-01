import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import phone from "phone";

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

  const { graph, token, contacts } = req.body;

  if (!graph) {
    const phoneNumbers: string[] = req.body.phoneNumbers;

    const auth = admin.auth();

    const users: {
      [phoneNumber: string]: {
        score: number;
        alreadyOnScorecard: boolean;
      };
    } = {};
    let pageToken = undefined;

    while (true) {
      const result: any = await auth.listUsers(1000, pageToken);
      result?.users?.forEach((userRecord: any) => {
        if (userRecord.phoneNumber) {
          if (phoneNumbers.includes(userRecord.phoneNumber)) {
            users[userRecord.phoneNumber] = {
              score: 1,
              alreadyOnScorecard: true,
            };
          }
        }
      });

      phoneNumbers.forEach((phoneNumber) => {
        if (!users[phoneNumber]) {
          users[phoneNumber] = {
            score: 0,
            alreadyOnScorecard: false,
          };
        } else {
        }
      });

      if (result.pageToken) {
        pageToken = result.pageToken;
      } else {
        break;
      }
    }

    res.status(200).json(users);
    return;
  } else {
    const decodedToken = await admin.auth().verifyIdToken(token);

    const db = getFirestore(app);

    await db.collection("contacts").doc(decodedToken.uid).set({
      contacts: contacts,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({
      success: true,
    });
  }
}
