import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import multiparty from "multiparty";
import { App } from "octokit";

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

  const {
    reason,
    firstName,
    lastName,
    message,
    respondToMe,
    urgent,
    district,
    username,
    password,
    token,
    repo,
    contactMethod,
    type,
  } = req.body;

  const device = req.body.device ?? req.headers["user-agent"]; // backwards compatability

  if (type === "anon") {
    if (!message || message.length < 1) {
      res.status(200).json({ success: false, error: "INVALID_MESSAGE" });
      return;
    }
    if (message && message.length > 5000) {
      res.status(200).json({ success: false, error: "INVALID_MESSAGE" });
      return;
    }

    if (!contactMethod || contactMethod.length < 1) {
      res.status(200).json({ success: false, error: "INVALID_CONTACT_METHOD" });
      return;
    }
    if (contactMethod && contactMethod.length > 100) {
      res.status(200).json({ success: false, error: "INVALID_CONTACT_METHOD" });
      return;
    }

    const docRef = await db.collection("feedback").add({
      reason: "ANON",
      device,
      message,
      read: false,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      contactMethod,
    });

    res.status(200).json({ success: true });
    return;
  }

  const decodedToken = await admin.auth().verifyIdToken(token);

  if (
    reason !== "HELP" &&
    reason !== "BUG" &&
    reason !== "SUGGESTION" &&
    reason !== "REPORT_POST"
  ) {
    res.status(200).json({ success: false, error: "INVALID_REASON" });
    return;
  }

  if (repo != "app" && repo != "scorecard" && repo != "extension") {
    res.status(200).json({ success: false, error: "INVALID_REPO" });
    return;
  }

  if (!firstName || firstName.length < 1) {
    res.status(200).json({ success: false, error: "INVALID_FIRST_NAME" });
    return;
  }

  if (firstName && firstName.length > 50) {
    res.status(200).json({ success: false, error: "INVALID_FIRST_NAME" });
    return;
  }

  if (lastName && lastName.length > 50) {
    res.status(200).json({ success: false, error: "INVALID_LAST_NAME" });
    return;
  }

  if (lastName && lastName.length > 50) {
    res.status(200).json({ success: false, error: "INVALID_LAST_NAME" });
    return;
  }

  if (!message || message.length < 1) {
    res.status(200).json({ success: false, error: "INVALID_MESSAGE" });
    return;
  }
  if (message && message.length > 5000) {
    res.status(200).json({ success: false, error: "INVALID_MESSAGE" });
    return;
  }

  if (district && district.length > 100) {
    res.status(200).json({ success: false, error: "INVALID_DISTRICT" });
    return;
  }

  if (username && username.length > 50) {
    res.status(200).json({ success: false, error: "INVALID_USERNAME" });
    return;
  }

  if (password && password.length > 50) {
    res.status(200).json({ success: false, error: "INVALID_PASSWORD" });
    return;
  }

  let data: any = {
    reason,
    device,
    name: {
      firstName,
      lastName,
    },
    phoneNumber: decodedToken.phone_number || "NONE",
    urgent: urgent || false,
    respondToMe: respondToMe || false,
    read: false,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    message,
  };
  if (username && password && district) {
    data = {
      ...data,
      login: {
        username,
        password,
        district,
      },
    };
  }

  const docRef = await db.collection("feedback").add(data);

  const doc = await docRef.get();

  const octokit = await new App({
    appId: process.env.GH_APP_ID!,
    privateKey: process.env.GH_PRIVATE_KEY!,
  }).getInstallationOctokit(parseInt(process.env.GH_INSTALLATION_ID!));

  await octokit.request("POST /repos/{owner}/{repo}/issues", {
    owner: "scorecardto",
    repo,
    title: `User Feedback [${doc.id}]`,
    body: `A user has submitted feedback.\n\n**ID:** ${doc.id}`,
    labels: ["user feedback", reason.toLowerCase()],
    headers: { "X-GitHub-Api-Version": "2022-11-28" },
  });

  res.status(200).json({ success: true });
}
