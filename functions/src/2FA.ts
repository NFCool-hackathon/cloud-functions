import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import * as twilio from "twilio";
import {twilioAuthToken, twilioSid} from "../.env";
const client = new twilio.Twilio(twilioSid, twilioAuthToken);

export const sendPhoneVerification = functions.region("europe-west1").https.onRequest(async (req, res) => {
  const tokenId = req.query.tokenId;
  const unitId = req.query.unitId;

  let phoneNumber = "";
  const sale = await admin.firestore().collection("sales").doc(tokenId + "-" + unitId).get();
  if (sale.data()?.phoneNumber) {
    phoneNumber = sale.data()?.phoneNumber;
  } else {
    res.status(404).send();
  }

  console.log("phoneNumber = " + phoneNumber);

  const twilioRes = await client.verify.services("VAae61bb31ff07b220a4b56ad7585e543b").verifications.create({to: phoneNumber, channel: "sms"});
  console.log(JSON.stringify(twilioRes));
  res.status(200).send();
});
