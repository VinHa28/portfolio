import { Router } from "express";
import {
    createCertification,
    deleteCertification,
    getAllCertification,
    getCertificationById,
    updateCertification,
} from "../controllers/certificationController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const certificationRoute = Router();

certificationRoute.get("/", getAllCertification);
certificationRoute.get("/:id", getCertificationById);
certificationRoute.post("/", verifyToken, createCertification);
certificationRoute.put("/:id", verifyToken, updateCertification);
certificationRoute.delete("/:id", verifyToken, deleteCertification);

export default certificationRoute;
