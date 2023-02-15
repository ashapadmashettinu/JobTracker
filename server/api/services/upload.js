import util from "util";
import multer from "multer";
import {v4 as uuidv4} from 'uuid';

const maxSize = 5 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + Date.now() + file.originalname );
  },
});

const uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize }
}).single("file");

export const upload = util.promisify(uploadFile);