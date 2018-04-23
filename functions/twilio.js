/*
 * File: /Users/michaelbeeson/Documents/VSCode/react-native-ud/one-time-password/functions/twilio.js
 */

const twilio = require("twilio");
const twilioAccount = require("./account/twilio-account");
// const accountSid = "ACa56e0169e5544762e492afedde96e965";
// const authToken = "3181a35d47a1a96e9cd366f6df212122";

module.exports = new twilio(twilioAccount.accountSid, twilioAccount.authToken);
