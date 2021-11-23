import * as functions from "firebase-functions";
import {isMinter, signatureToAddress} from "./utils/eth-sig";
import {triggerError} from "./utils/error";

export const uploadImageOnIPFS = functions.region("us-central1").https.onCall(async ({signature}) => {
  const address = signatureToAddress(signature);
  const minterAddress = await isMinter(address);

  if (minterAddress) {
    return;
  } else {
    triggerError("permission-denied", "You're not a minter");
  }
});
