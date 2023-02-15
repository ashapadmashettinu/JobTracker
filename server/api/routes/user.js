import express from "express";
import * as userController from '../controllers/user.js';

/**
 * contains the routes for user create, search, search delete and update by id
 */
const router = express.Router();

router.route('/users')
    .post(userController.create)
    .get(userController.search);

router.route('/users/:id')
    .get(userController.findById)
    .delete(userController.deleteById)
    .put(userController.update);


export default router;