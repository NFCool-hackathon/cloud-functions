import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import {serverKey} from "../.env";
import {triggerError} from "./utils/error";

export const setPhoneNumber = functions.region("us-central1").https.onCall(async ({tokenId, unitId, phoneNumber, key}) => {
  if (key as string == serverKey) {
    await admin.firestore().collection("sales").doc(tokenId + "-" + unitId).set({phoneNumber: phoneNumber});
    return;
  } else {
    triggerError("permission-denied", "You need admin permission to access this functions");
  }
});
