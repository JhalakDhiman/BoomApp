import { v2 as cloudinary } from 'cloudinary';

export const uploadVideoToCloudinary = async(file,folder,quality,height) =>{
    const options = {folder};
    if(quality){
        options.quality = quality;
    }
    if(height){
        options.height = height;    
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}