const nodemailer = require("nodemailer");
const sendMail = async ({ to, subject, text }) => {
  const email = {
    from: "kapustat@meta.ua",
    to,
    subject,
    text,
  };
  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "kapustat@meta.ua",
      pass: process.env.META_PASS,
    },
  };
  const transporter = nodemailer.createTransport(config);

  await transporter.sendMail(email);
};
module.exports = {
  sendMail,
};
