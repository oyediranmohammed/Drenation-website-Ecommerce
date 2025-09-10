import cloudinary from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
    cloud_name : 'dljmim20t',
    api_key : '852536984617668',
    api_secret : 'ulI-y1UHPZGaBS78hTpQPRk2Bl0',
});

async function imageUploadUtil(file){
    const result = await cloudinary.uploader.upload(file, {
        resource_type : 'auto'
    })

    return result;
}

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ads",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({storage});

export {upload, imageUploadUtil};


