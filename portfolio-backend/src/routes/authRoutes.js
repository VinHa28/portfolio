import express from 'express';
import { login, logout, refresh } from '../controllers/authController.js';

const authRoute = express.Router();

authRoute.post('/login', login);
authRoute.post('/logout', logout);
authRoute.post('/refresh', refresh);

export default authRoute;