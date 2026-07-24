import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use STARTTLS

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,

  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (to, otp) => {
  try {
    console.log("\n================ EMAIL DEBUG ================");
    console.log("📩 Recipient :", to);
    console.log("📧 Sender    :", process.env.EMAIL_USER);
    console.log("📨 Sending OTP...");

    const info = await transporter.sendMail({
      from: `"RB Chat" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Verify Your Email - RB Chat",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;">
          <h2 style="color:#4F46E5;">RB Chat</h2>

          <p>Hello,</p>

          <p>Your verification OTP is:</p>

          <div style="
            font-size:32px;
            font-weight:bold;
            letter-spacing:8px;
            color:#4F46E5;
            margin:20px 0;
          ">
            ${otp}
          </div>

          <p>This OTP is valid for <strong>10 minutes</strong>.</p>

          <p>If you didn't request this email, you can safely ignore it.</p>

          <hr>

          <p style="font-size:12px;color:#666;">
            RB Chat Team
          </p>
        </div>
      `,
    });

    console.log("\n========== GMAIL RESPONSE ==========");
    console.log("Message ID :", info.messageId);
    console.log("Accepted   :", info.accepted);
    console.log("Rejected   :", info.rejected);
    console.log("Response   :", info.response);
    console.log("====================================\n");

    return true;
  } catch (error) {
    console.error("\n❌ EMAIL ERROR");
    console.error(error);
    throw error;
  }
};

export default sendEmail;