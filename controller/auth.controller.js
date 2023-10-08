const passport = require("passport");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

//==========================================//
//          Passport Auth Stratergy         //
//==========================================//
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const HubSpotStrategy = require("passport-hubspot-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const InstagramStrategy = require("passport-instagram").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;

//=========================//
//          Email          //
//=========================//
const user = process.env.EMAIL;
const password = process.env.PASSWORD;
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: user,
    pass: password,
  },
  tls: {
    // ciphers:'SSLv3',
    rejectUnauthorized: false,
  },
});

//=========================//
//          Signup         //
//=========================//
exports.signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    //finding existing user using email
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).send("Email already exists");

    if (confirmPassword !== password)
      return res.status(400).send("Password Do not Match");

    //hashing password using brcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      emailToken: crypto.randomBytes(64).toString("hex"),
      isVerified: false,
    });

    await user.save();

    //doing with nodemailer
    let mailOptions = {
      from: '"Verify your email" <17102251brawl@gmail.com>',
      to: user.email,
      subject: "you need to verify your email",
      html: ` <h2>${user.username}! Thanks for registering on our site</h2>
          <h4> Please verify you mail to continue....</h4>
          <a href="http://${req.headers.host}/auth/verify-email?token=${user.emailToken}">Verify Your Email</a> `,
    };
    //sending mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(401).send("Email not sent");
      } else console.log("Verification email is sent to you gmail account");
    });

    return res.status(201).send("User created successfully!");
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

//===============================//
//          Verify Email         //
//===============================//
exports.verifyEmail = async (req, res) => {
  try {
    const token = req.query.token;

    //finding user using emailToken
    const user = await User.findOne({ emailToken: token });
    if (!user) return res.status(401).send("Email not verified!");
    user.emailToken = null;
    user.isVerified = true;
    await user.save();
    console.log("Email Verified");
    return res.status(201).end("Email verified!");
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

//=========================//
//          SignIn         //
//=========================//
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(401).send("Enter Email or password!!");

    //finding existing user using email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("Invalid Credential");

    //comparing password using bcrypt
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).send("Invalid Credentials");

    //creating token using jwt
    const token = jwt.sign({ userId: user._id }, "secretkey", {
      expiresIn: "1h",
    });
    if (!token) return res.status(401).send("Invalid Credentials");
    res.cookie("access-token", token);
    res.json({ token });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

//=====================================//
//          Reset Password             //
//=====================================//
exports.resetPasswd = async (req, res) => {
  try {
    const { email } = req.body;

    //finding existing user using email
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(400).send("Email not exists");

    //creating token using crypto
    const emailToken = crypto.randomBytes(64).toString("hex");
    existingUser.emailToken = emailToken;
    await existingUser.save();

    //doing with nodemailer
    let mailOptions = {
      from: '"Verify your email" <17102251brawl@gmail.com>',
      to: email,
      subject: "Update your password",
      html: ` <h2>${existingUser.username}! Thanks for registering on our site</h2>
          <h4> Please use below link to reset password....</h4>
          <a href="http://${req.headers.host}/auth/update-passwd?token=${emailToken}">Update your Password</a> `,
    };

    //sending mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(401).send("Email not sent");
      } else console.log("Updation email is sent to your gmail account");
    });
    return res
      .status(200)
      .send("Updation email is sent to your gmail account!!");
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

//==========================================//
//          Reset Email Password            //
//==========================================//
exports.updatePasswd = async (req, res) => {
  try {
    const token = req.query.token;
    console.log(token);
    res.status(201).end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Password Form</title>
    </head>
    <body>
      <h1>Password Form</h1>
      <form action="/auth/successReset" method="GET" id="passwordForm">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required minlength="6"><br><br>

        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required minlength="6"><br><br>

        <input type="submit" value="Submit">
      </form>

      <script>
        // JavaScript to handle form submission
        const form = document.getElementById('passwordForm');
        form.addEventListener('submit', (event) => {
          event.preventDefault(); // Prevent the default form submission

          // Get the values from the password and confirmPassword fields
          const password = document.getElementById('password').value;
          const confirmPassword = document.getElementById('confirmPassword').value;
          console.log(password);
          // Check if passwords are equal and have a minimum length of 6
          if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return false;
          }

          // Redirect to another page with query parameters
          window.location.href = '/auth/successReset?password=' + encodeURIComponent(password) + '&token=${token}'
        });
      </script>
    </body>
    </html>
  `);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

//==========================================//
//          Success Reset Password          //
//==========================================//
exports.successReset = async (req, res) => {
  try {
    const { password, token } = req.query;

    //finding user using emailToken
    const user = await User.findOne({ emailToken: token });
    if (!user) return res.status(401).send("User not Found!");
    user.emailToken = null;
    user.isVerified = true;

    //hashing password using brcrypt
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    console.log("Email Verified");
    res.status(201).end(`updated password successfully!!`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//=========================//
//          Logout         //
//=========================//
exports.logout = (req, res) => {
  res.clearCookie("access-token");
  return res.status(200).send("Logged out successfully");
};
