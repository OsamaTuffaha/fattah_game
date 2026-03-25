const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "category",
    resource_type: "auto", // 🔥 مهم جدًا
    allowed_formats: [
      "jpg",
      "png",
      "jpeg",
      "mp4",
      "mov",
      "avi",
      "mp3",
      "wav"
    ],
  },
});

const upload = multer({ storage });

module.exports = upload;