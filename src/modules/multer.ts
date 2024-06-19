import multer from "multer";
import path from "path";

//defines some storage configurations, feel free to customize it to your liking..
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path.join(__dirname, "../../uploads"));
  },
  filename(_, file, callback) {
    callback(null, file.originalname);
  },
});

export const upload = multer({ storage });
