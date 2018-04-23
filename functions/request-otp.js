/*
* File: /Users/michaelbeeson/Documents/VSCode/react-native-ud/one-time-password/functions/request-OTP.js
*/
const admin = require("firebase-admin");
const twilio = require("./twilio");

module.exports = function(req, res) {
  if (!req.body.phone) {
    return res.send(422).send({ error: "You must provide a phone number" });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "");

  // Firebase User Model
  // https://firebase.google.com/docs/auth/admin/manage-users
  // Property Type  Description
  // uid  string  - The uid to assign to the newly created user. Must be a string between 1 and 128 characters long, inclusive. If not provided, a random uid will be automatically generated.
  // email  string  - The user's primary email. Must be a valid email address.
  // emailVerified  boolean - Whether or not the user's primary email is verified. If not provided, the default is false.
  // phoneNumber  string  - The user's primary phone number. Must be a valid E.164 spec compliant phone number.
  // password string  - The user's raw, unhashed password. Must be at least six characters long.
  // displayName  string  - The users' display name.
  // photoURL string  - The user's photo URL.
  // disabled boolean - Whether or not the user is disabled. true for disabled; false for enabled. If not provided, the default is false.

  admin
    .auth()
    .getUser(phone)
    .then(userRecord => {
      const code = Math.floor(Math.random() * 8999 + 1000);

      twilio.messages.create(
        {
          body: "Your code is " + code,
          to: phone,
          from: "4159496669"
        },
        err => {
          if (err) {
            return res.status(422).send("twilio error: " + err);
          }
          // https://firebase.google.com/docs/reference/admin/node/admin.database.Reference
          admin
            .database()
            .ref("users/" + phone)
            .update({ code: code, codeValid: true }, () => {
              res.send({ success: true });
            });
        }
      );

      return null;
    })
    .catch(err => {
      res.status(422).send({ error: "Firebase error: " + err });
      return null;
    });
};
