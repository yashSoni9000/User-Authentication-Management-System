"use strict";
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");
const {
  schema,
  email,
  schemaLogin,
} = require("../middleware/joi_verification");
require("dotenv").config();

//=============================//
//     Joi schema Validate     //
//=============================//
const validate = (schema) => async (req, res, next) => {
  try {
    console.log("body =>", req.body);
    //validate Schema
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

//=========================//
//          Signup         //
//=========================//
router.post("/signup", validate(schema), authController.signup);

//===============================//
//          Verify Email         //
//===============================//
router.get("/verify-email", authController.verifyEmail);

//=========================//
//          SignIn         //
//=========================//
router.post(
  "/signin",
  validate(schemaLogin),
  authMiddleware.verifyEmail,
  authController.signin
);

//=====================================//
//          Reset Password             //
//=====================================//
router.post("/resetpasswd", validate(email), authController.resetPasswd);

//======================================//
//          Success Reset               //
//======================================//
router.get("/update-passwd", authController.updatePasswd);

//=============================//
//          Reset Mail         //
//=============================//
router.get("/successReset", authController.successReset);

//=========================//
//          Logout         //
//=========================//
router.post("/logout", authController.logout);

//=================================//
//         Google Auth             //
//=================================//

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleRedirectURI = "http://localhost:9003/auth/google/callback";

// Initiate Google OAuth2 login
router.get("/google", (req, res) => {
  try {
    const authURL = `https://accounts.google.com/o/oauth2/auth?response_type=code&scope=profile%20email&client_id=${googleClientId}&redirect_uri=${googleRedirectURI}`;
    res.redirect(authURL);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

// Handle the Google OAuth2 callback
router.get("/google/callback", async (req, res) => {
  const { code } = req.query;
  try {
    if (!code) {
      return res.status(400).send("Code not provided");
    } else res.send("Logged in successfully");
  } catch (error) {
    res.status(400).send("Internal Server Error");
  }
});

//==============================//
//         HubSpot Auth         //
//==============================//

const hubspotClientId = process.env.HUBSPOT_CLIENT_ID;
const hubspotRedirectUri = process.env.HUBSPOT_REDIRECT_URI;
const hubspotAuthUrl = `https://app.hubspot.com/oauth/authorize?client_id=${hubspotClientId}&redirect_uri=${hubspotRedirectUri}&scope=oauth%20crm.objects.contacts.read`;

router.get("/hubspot", (req, res) => {
  res.redirect(hubspotAuthUrl);
});

// Hubspot Callback
router.get("/hubspot/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(401).send("Authorization code not provided.");
  } else res.status(200).send("success");
});

//================================//
//         Facebook Auth          //
//================================//
const axios = require("axios");
const accessTokens = new Set();

// facebook

const facebookAppId = process.env.FACEBOOK_APP_ID;
const facebookAppSecret = process.env.FACEBOOK_APP_SECRET;
router.get("/facebook", (req, res) => {
  res.send(`
  <html>
    <body>
      <a href="https://www.facebook.com/v6.0/dialog/oauth?client_id=${facebookAppId}&redirect_uri=${encodeURIComponent(
    "http://localhost:9003/auth/oauth-redirect"
  )}">
        Log In With Facebook
      </a>
    </body>
  </html>
`);
});

// Route 2: Exchange auth code for access token
router.get("/oauth-redirect", async (req, res) => {
  try {
    const authCode = req.query.code; // Get auth code

    const accessTokenUrl =
      "https://graph.facebook.com/v6.0/oauth/access_token?" +
      `client_id=${appId}&` +
      `client_secret=${facebookAppSecret}&` +
      `redirect_uri=${encodeURIComponent(
        "http://localhost:9003/auth/oauth-redirect"
      )}&` +
      `code=${encodeURIComponent(authCode)}`; // Make an API request to exchange `authCode` for an access token

    const accessToken = await axios
      .get(accessTokenUrl)
      .then((res) => res.data["access_token"]); // Store the token in memory for now. Later we'll store it in the database.
    console.log("Access token is", accessToken);
    accessTokens.add(accessToken);

    res.send(`auth done`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.response.data || err.message });
  }
});

//======================//
//    Instagram Auth    //
//======================//
const instaAppId = process.env.INSTAGRAM_CLIENT_ID;
const instaAppSecret = process.env.INSTAGRAM_CLIENT_SECRET;
const instaRedirectUri = "https://www.google.com/";

router.get("/instagram", (req, res) => {
  res.send(`
  <html>
    <body>
      <a href="https://api.instagram.com/oauth/authorize?client_id=${instaAppId}&redirect_uri=${instaRedirectUri}&scope=user_profile,user_media&response_type=code">
        Log In With Instagram
      </a>
    </body>
  </html>
`);
});

//=======================//
//    LinkedIn Auth      //
//=======================//

const linkedinRedirectUri = "http://localhost:9003/auth/linkedin/callback";
const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=773a18kvzjii8v&redirect_uri=${linkedinRedirectUri}&scope=openid%20profile`;
router.get("/linkedin", (req, res) => {
  res.redirect(linkedinAuthUrl);
});
router.get("/linkedin/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(401).send("Authorization code not provided.");
  } else {
    return res.status(200).send("Authorization Done.");
  }
});

//=======================//
//    Twitter Auth       //
//=======================//

const twitterConsumerKey = process.env.TWITTER_CONSUMER_KEY;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
const twitterCallbackURL = "https://www.google.com/";

router.get("/twitter", (req, res) => {
  res.send(`
  <html>
    <body>
      <a href="https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${twitterConsumerKey}&redirect_uri=${twitterCallbackURL}&scope=tweet.read%20users.read%20follows.read%20follows.write&state=state&code_challenge=challenge&code_challenge_method=plain">
        Log In With Twitter
      </a>
    </body>
  </html>
`);
});

module.exports = router;
