import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, otp) => {
  try {
    console.log("\n================ EMAIL DEBUG ================");
    console.log("📩 Recipient :", to);
    console.log("📧 Sender    :", process.env.EMAIL_USER);

    console.log("🔄 Connecting to Gmail...");
    await transporter.verify();
    console.log("✅ Gmail SMTP Connected");

    const info = await transporter.sendMail({
      from: `"RB Chat" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Verify Your Email - RB Chat",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
          <h2>RB Chat Email Verification</h2>

          <p>Hello,</p>

          <p>Your OTP is:</p>

          <h1 style="letter-spacing:6px;color:#4F46E5;">${otp}</h1>

          <p>This OTP is valid for <strong>10 minutes</strong>.</p>

          <p>If you didn't request this email, you can ignore it.</p>

          <hr/>
          <small>RB Chat Team</small>
        </div>
      `,
    });

    console.log("\n========== GMAIL RESPONSE ==========");
    console.log("Message ID :", info.messageId);
    console.log("Accepted   :", info.accepted);
    console.log("Rejected   :", info.rejected);
    console.log("Pending    :", info.pending);
    console.log("Response   :", info.response);
    console.log("====================================\n");

    if (info.rejected.length > 0) {
      throw new Error(`Email rejected: ${info.rejected.join(", ")}`);
    }

    return true;
  } catch (error) {
    console.error("\n❌ EMAIL ERROR");
    console.error(error);
    throw error;
  }
};

export default sendEmail;