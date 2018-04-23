const admin = require("firebase-admin");

module.exports = function(req, res) {
  // Verify the user provided a phone number
  if (!req.body.phone) {
    return res.status(422).send({ error: "Bad input" });
  }

  // Format phone number to remove dashes, spaces and parens
  // /[^\d]/g match globally any non digits
  const phone = String(req.body.phone).replace(/[^\d]/g, "");

  // Create a new user account using the phone number
  // .createUser({ uid: phone }) // async request
  admin
    .auth()
    .createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }));

  // Respond to the user request, saying the account was made
};
