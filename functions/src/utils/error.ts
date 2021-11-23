import * as functions from "firebase-functions";
import {FunctionsErrorCode, HttpsError} from "firebase-functions/lib/providers/https";

export const triggerError = (code: FunctionsErrorCode, message: string): HttpsError => {
  console.error(message);
  throw new functions.https.HttpsError(code, message);
};
