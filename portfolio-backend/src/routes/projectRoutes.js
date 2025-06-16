import express from 'express';
import { createProject, deleteProject, getAllProjects, updateProject } from '../controllers/projectController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const projectRoute = express.Router();

projectRoute.get('/', getAllProjects);
projectRoute.post('/', verifyToken, createProject);
projectRoute.delete('/:id', verifyToken, deleteProject);
projectRoute.put('/:id', verifyToken, updateProject);

export default projectRoute;