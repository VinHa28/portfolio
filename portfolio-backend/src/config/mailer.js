import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER, // vin...@gmail.com
        pass: process.env.EMAIL_PASS  // app password 16 ký tự
    }
});

export const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    }

    await transporter.sendMail(mailOptions);
}

export default transporter;