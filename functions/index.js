/*
 * File: /Users/michaelbeeson/Documents/VSCode/react-native-ud/one-time-password/functions/index.js
 */

const admin = require("firebase-admin");
const functions = require("firebase-functions");
const createUser = require("./create-user");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });

exports.createUser = functions.https.onRequest(createUser);
