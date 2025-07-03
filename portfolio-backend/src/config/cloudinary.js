import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import path from 'path';
import { configDotenv } from 'dotenv';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Image Storage
export const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio/images',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
        transformation: [
            { width: 1200, height: 1200, crop: 'limit', quality: 'auto' },
            { fetch_format: 'auto' }
        ],
        overwrite: true,
        invalidate: true
    }
});

// CV Storage
export const cvStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio/cv',
        resource_type: 'auto',
        allowed_formats: ['pdf', 'doc', 'docx'],
        public_id: (req, file) => {
            return `HaVanVinh_GeneralCV_2025`;
        },
        access_mode: "public",
        overwrite: true,
        invalidate: true,
        version: false
    },
});

// Thumbnail Storage
export const thumbnailStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio/thumbnails',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
        transformation: [
            { width: 800, height: 600, crop: 'limit', quality: 'auto' },
            { fetch_format: 'auto' }
        ],
        overwrite: true,
        invalidate: true
    }
});