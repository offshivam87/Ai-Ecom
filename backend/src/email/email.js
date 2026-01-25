// require('dotenv').config();
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 587,
//   secure: false, // 587 ke liye false
//   auth: {
//     user: process.env.BREVO_SMTP_USER,
//     pass: process.env.BREVO_SMTP_PASS,
//   },
// });


// // Verify the connection configuration
// transporter.verify((error, success) => {
//   if (error) {
//     console.error('Error connecting to email server:', error);
//   } else {
//     console.log('Email server is ready to send messages');
//   }
// });

// // Function to send email
// // to, subject, text, html

// const sendEmail = async (to, subject, text, html) => {
//   try {
//     await transporter.sendMail({
//       from: `"DLeap Kart" <codewithtrapnog@gmail.com>`,
//       to,
//       subject,
//       text,
//       html,
//     });

//     console.log("Email sent successfully ✅");
//   } catch (err) {
//     console.error("Email error ❌", err);
//     throw err;
//   }
// };


// module.exports = sendEmail;

const axios = require("axios");

const sendEmail = async ({ to, subject, html }) => {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "DLeap Kart",
          email: "codewithtrapnog@gmail.com", // VERIFIED sender
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        timeout: 10000,
      }
    );
  } catch (err) {
    console.error(
      "BREVO API ERROR:",
      err.response?.data || err.message
    );
    throw err;
  }
};

module.exports = sendEmail;
