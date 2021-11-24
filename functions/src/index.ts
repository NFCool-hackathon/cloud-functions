import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {checkPhoneVerification, sendPhoneVerification} from "./2FA";

admin.initializeApp(functions.config().firebase);

exports.sendPhoneVerification = sendPhoneVerification;
exports.checkPhoneVerification = checkPhoneVerification;
