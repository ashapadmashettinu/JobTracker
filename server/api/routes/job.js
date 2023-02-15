import express from "express";
import * as jobController from '../controllers/job.js';

/**
 * contains the routes for job create, search, search delete and update by id
 */
const router = express.Router();

router.route('/jobs')
    .post(jobController.create)
    .get(jobController.search);

router.route('/jobs/:id')
    .get(jobController.findById)
    .delete(jobController.deleteById)
    .put(jobController.update);


export default router;