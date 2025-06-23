import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/images`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// middleware responsible to read from data and upload the file object to the mentioned path

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1000 * 1000, // 1mb
  },
});
