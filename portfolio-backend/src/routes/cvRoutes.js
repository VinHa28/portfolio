import express from "express";
import multer from "multer";
import { cvStorage } from "../config/cloudinary.js";
import { verifyToken } from "../middleware/verifyToken.js";

const cvRoute = express.Router();

// Config Multer
const uploadCV = multer({
    storage: cvStorage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only accept PDF, DOC, DOCX files'), false);
        }
    }
});

// Upload CV
cvRoute.post('/upload', verifyToken, (req, res) => {
    const uploadHandler = uploadCV.single('cv');

    uploadHandler(req, res, (error) => {
        if (error) {
            console.log(error);
            res.status(400).json({
                message: 'Upload failed',
                error: error.message
            })
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log(req.file.path)

        res.json({
            message: 'CV uploaded successfully (old CV replaced)',
            file: {
                fieldname: req.file.fieldname,
                url: req.file.path,
                publicId: req.file.public_id,
                size: req.file.size,
            }
        })
    })
})


export default cvRoute;