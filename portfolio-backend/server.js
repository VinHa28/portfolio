import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/database.js';
import projectRoute from './src/routes/projectRoutes.js';
import certificationRoute from './src/routes/certificationRoutes.js';
import authRoute from './src/routes/authRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url'
import cvRoute from './src/routes/cvRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoute);
app.use('/api/project', projectRoute);
app.use('/api/certification', certificationRoute)
app.use('/api/cv', cvRoute);

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {

  console.log(fileURLToPath(import.meta.url));
  console.log(`Server running on port ${PORT}: http://localhost:${PORT}`);
});
