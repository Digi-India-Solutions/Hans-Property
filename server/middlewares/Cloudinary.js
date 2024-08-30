const cloudinary = require('cloudinary').v2;

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME
});

const uploadImages = async(file)=>{
  try {
    const imageUrl = await cloudinary.uploader.upload(file)
    return imageUrl.secure_url
  } catch (error) {
    console.log(error);
  }
}


module.exports = {uploadImages};
