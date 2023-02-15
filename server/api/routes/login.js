import express from "express";
import * as userController from '../controllers/user.js';

/**
 * contains the routes for user create, search, search delete and update by id
 */
const router = express.Router();

router.route('/login')
    .post(userController.login);

export default router;