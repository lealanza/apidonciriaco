import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: 'ddyg4xvws',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(fileData: Express.Multer.File) {
    const result = await cloudinary.uploader.upload(fileData.path, {
      folder: 'replit', // change this to your desired folder name
    });
  
    return {
      public_id: result.public_id,
      url: result.secure_url,
      secure_url: result.secure_url,
    };
  }


