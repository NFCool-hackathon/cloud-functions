import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import * as twilio from "twilio";
import {twilioAuthToken, twilioSid} from "../.env";
const client = new twilio.Twilio(twilioSid, twilioAuthToken);

export const sendPhoneVerification = functions.region("us-central1").https.onRequest(async (req, res) => {
  const tokenId = req.query.tokenId;
  const unitId = req.query.unitId;

  let phoneNumber = "";
  const sale = await admin.firestore().collection("sales").doc(tokenId + "-" + unitId).get();
  if (sale.data()?.phoneNumber) {
    phoneNumber = sale.data()?.phoneNumber;
  } else {
    res.status(404).send();
  }

  const twilioRes = await client.verify.services("VAae61bb31ff07b220a4b56ad7585e543b").verifications.create({to: phoneNumber, channel: "sms"});
  console.log("DEBUG TWILIO RES");
  console.log(JSON.stringify(twilioRes));
  res.status(200).send();
});

export const checkPhoneVerification = functions.region("us-central1").https.onRequest(async (req, res) => {
  const tokenId = req.query.tokenId;
  const unitId = req.query.unitId;
  const pin = req.query.pin as string;

  if (!pin || !tokenId || !unitId) {
    console.error("You need to send all parameters");
    res.status(400).send({message: "You need to send all parameters"});
  }

  let phoneNumber = "";
  const sale = await admin.firestore().collection("sales").doc(tokenId + "-" + unitId).get();
  if (sale.data()?.phoneNumber) {
    phoneNumber = sale.data()?.phoneNumber;
  } else {
    console.error("No phone number is associated with this token");
    res.status(404).send({message: "No phone number is associated with this token"});
  }

  let twilioRes;
  try {
    twilioRes = await client.verify.services("VAae61bb31ff07b220a4b56ad7585e543b").verificationChecks.create({to: phoneNumber, code: pin});
    console.log("DEBUG TWILIO RES");
    console.log(JSON.stringify(twilioRes));
  } catch (e) {
    console.log("DEBUG TWILIO ERROR");
    console.error(JSON.stringify(twilioRes));
    res.status(500).send(e);
  }

  if (twilioRes && twilioRes.valid) {
    res.status(200).send({valid: true});
  } else {
    res.status(200).send({valid: false});
  }
});
