import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

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

  const { clientId } = req.body;

  const docRef = await db.collection("extensionUsers").doc(clientId);

  if (docRef) {
    const doc = await docRef.get();
    const uninstallReason = doc.data()?.uninstallReason;

    if (uninstallReason) {
      await docRef.set({
        deleted: true,
        uninstallReason,
      });
    } else {
      await docRef.set({
        deleted: true,
      });
    }

    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ success: false, error: "NO_DOCUMENT_FOUND" });
  }
}
