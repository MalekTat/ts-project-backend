
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Setup Cloudinary Storage with Multer
const storage = new CloudinaryStorage({
  cloudinary,
  folder: 'growth_logs', // Folder in Cloudinary to store images
  allowedFormats: ['jpg', 'png'], // Allowed formats for image upload
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save file with its original name
  }
});

// Create the multer instance with cloudinary storage
const upload = multer({ storage });

export { upload };