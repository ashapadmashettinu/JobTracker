import express from "express";
import * as mailController from '../controllers/mail.js';

/**
 * contains the routes for user create, search, search delete and update by id
 */
const router = express.Router();

router.route('/mail')
    .post(mailController.sendMail);


export default router;