// /lib/firebaseAdmin.js
import admin from "firebase-admin";
import serviceAccount from "./rebirth-jobs-firebase-adminsdk-32hy9-9a84a383a1.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const authAdmin = admin.auth();
