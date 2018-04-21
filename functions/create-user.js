/*
 * File: /Users/michaelbeeson/Documents/VSCode/react-native-ud/one-time-password/functions/create-user.js
 */

const admin = require("firebase-admin");

// req - request, res - reponse
module.exports = function(req, res) {
  // Verify the user provided a phone number
  if (!req.body.phone) {
    return res.status(422).send({ error: "Bad input" });
  }

  // Format phone number to remove dashes, spaces and parens
  const phone = String(req.body.phone).replace(/[^\d]/g, ""); // /[^\d]/g match globally any non digits

  // Create a new user account using the phone number
  admin
    .auth()
    .createUser({ uid: phone }) // async request
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }));

  // Respone to the user request, saying the account was made
};
