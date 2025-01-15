import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import path from 'path'; 


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.CLOUD_API_KEY!,
  api_secret: process.env.CLOUD_API_SECRET!,
});



const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    
    const originalName = path.parse(file.originalname).name; // File name without extension
    const extension = path.extname(file.originalname); // File extension 

    if (!['.jpg', '.jpeg', '.png'].includes(extension.toLowerCase())) {
      throw new Error('Unsupported file format');
    }

    return {
      folder: 'profile_photos', // Folder name in Cloudinary
      resource_type: 'auto', // Automatically determine file type
      public_id: originalName, // Use file name without extension as public ID
      format: extension.replace('.', ''), 
    };
  },
});



const upload = multer({ storage });

export default upload;
