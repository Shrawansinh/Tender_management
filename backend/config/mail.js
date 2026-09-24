const nodemailer = require("nodemailer");

console.log("EMAIL:", process.env.EMAIL);
console.log("PASS:", process.env.EMAIL_PASSWORD);

const transporter = nodemailer.createTransport({

  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
module.exports = transporter;