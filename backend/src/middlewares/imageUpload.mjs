import multer from "multer";
import cloudinary from "../utils/cloudinaryConfig.mjs";

const storage = multer.diskStorage({
  filename: (request, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (request, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const uploadProduct = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).send({ success: false, message: err.message });
    }
    cloudinary.uploader.upload(
      req.file.path,
      { width: 1080, height: 1920 },
      (err, result) => {
        if (err) {
          return res.status(400).send({ success: false, message: err.message });
        }
        res.json({ success: true, image: result.secure_url });
      }
    );
  });
};

export default uploadProduct;
