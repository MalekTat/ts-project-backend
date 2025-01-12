import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.CLOUD_API_KEY!,
  api_secret: process.env.CLOUD_API_SECRET!,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: 'profile_photos',  // The name of the folder in Cloudinary
    resource_type: 'auto', // Automatically determines the file's type
    public_id: file.originalname, // The file on Cloudinary will have the same name as the original file name
  }),
});

const upload = multer({ storage });

export default upload;
