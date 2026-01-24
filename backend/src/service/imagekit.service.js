var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT 
});


const uploadFile = async (file) => {
  return imagekit.upload({
    file: file.buffer, // 👈 req.file.buffer
    fileName: Date.now() + "-" + file.originalname,
    folder: "/products",
  });
};
module.exports = { uploadFile };