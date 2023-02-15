import express from "express";
import * as applicationController from '../controllers/application.js';

/**
 * contains the routes for application create, search, search delete and update by id
 */
const router = express.Router();

router.route('/applications')
    .post(applicationController.create)
    .get(applicationController.search);

router.route('/applications/:id')
    .get(applicationController.findById)
    .delete(applicationController.deleteById)
    .put(applicationController.update);


export default router;