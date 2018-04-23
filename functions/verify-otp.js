/*
 * File: /Users/michaelbeeson/Documents/VSCode/react-native-ud/one-time-password/functions/verify-otp.js
 */
/* eslint promise/no-nesting: 0 */

const admin = require("firebase-admin");

module.exports = function(req, res) {
  if (!req.body.phone || !req.body.code) {
    return res
      .status(422)
      .send({ error: "Format error: Phone and code must be provided." });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  const code = parseInt(req.body.code);

  admin
    .auth()
    .getUser(phone)
    .then(() => {
      const ref = admin.database().ref("users/" + phone);
      ref.on("value", snapshot => {
        ref.off();
        const user = snapshot.val();

        if (user.code !== code || !user.codeValid) {
          return res.status(422).send({
            error:
              "Validation error: Code not valid. User.code: " +
              user.code +
              " code: " +
              code
          });
        }

        ref.update({ codeValid: false });

        admin
          .auth()
          .createCustomToken(phone)
          .then(token => {
            res.send({ token: token });
            return null;
          })
          .catch(err => {
            res.status(422).send({ error: "Firebase getUser error: " + err });
            return null;
          });
      });

      return null;
    })
    .catch(err => {
      res.status(422).send({ error: "Firebase getUser error: " + err });
      return null;
    });
};
