import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: 'ddyg4xvws',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
export async function uploadImages(filePath: string){
    return await cloudinary.uploader.upload(filePath,{
        folder:'replit'
    })
}

export async function deleteImages(public_id: string){
    return await cloudinary.uploader.destroy(public_id)
}

