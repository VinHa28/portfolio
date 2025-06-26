import express from 'express';
import {
    login,
    logout,
    refresh,
    requestOTP,
    verifyOtp
} from '../controllers/authController.js';

const authRoute = express.Router();

authRoute.post('/login', login);
authRoute.post('/request-otp', requestOTP);
authRoute.post('/verify-otp', verifyOtp);
authRoute.post('/logout', logout);
authRoute.post('/refresh', refresh);

export default authRoute;
