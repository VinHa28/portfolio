import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import RefreshToken from "../models/RefreshToken.js";
import { sendEmail } from "../config/mailer.js";
import OtpToken from "../models/OtpToken.js";


// Send OTP
const sendOtpEmail = async (email, otp) => {
    await sendEmail(email, "Your OTP code", `Your OTP is: ${otp}`);
}

export const requestOTP = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required." });
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Wrong admin email!" });

        await OtpToken.deleteMany({ userId: user._id });

        const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await OtpToken.create({
            userId: user._id,
            otp,
            expiresAt
        })

        await sendOtpEmail(user.email, otp);
        res.json({ message: "OTP sent to your email" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Verify OTP
export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP is required." });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json("Invalid email");
        const otpRecord = await OtpToken.findOne({ userId: user._id, otp, expiresAt: { $gt: new Date() } });
        if (!otpRecord) return res.status(400).json({ message: "Invalid or expired OTP" });

        await OtpToken.deleteOne({ _id: otpRecord._id });

        // Create JWT token
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_LIFE }
        );

        const refreshToken = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        await RefreshToken.create({
            token: refreshToken,
            userId: user._id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) //7 days
        })

        res.json({
            message: "Login successfully",
            token,
            refreshToken
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: 'Username and password are required.'
        });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Username or password is incorrect.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ message: 'Username or password is incorrect.' });

        // Create JWT token
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_LIFE }
        );

        const refreshToken = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        await RefreshToken.create({
            token: refreshToken,
            userId: user._id,
            expiresAt,
        })

        res.json({
            message: 'Login successful',
            token,
            refreshToken
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

export const logout = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required.' });
    }

    try {
        await RefreshToken.deleteOne({ token: refreshToken });
        res.json({ message: 'Logout successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const refresh = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided." });
    }

    try {
        const foundedToken = await RefreshToken.findOne({ token: refreshToken });
        if (!foundedToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const newToken = jwt.sign(
            { id: foundedToken.userId },
            process.env.JWT_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_LIFE }
        );

        res.json({ token: newToken });
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: "Invalid or expired refresh token" });
    }
}