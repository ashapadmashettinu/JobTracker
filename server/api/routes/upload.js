import express from "express";
import * as uploadController from '../controllers/upload.js';

const router = express.Router();

router.route('/files')
    .post(uploadController.uploadFile);
router.route('/files/:name')
    .get(uploadController.download);

export default router;