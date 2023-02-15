import * as jobService from '../services/job.js'
import { setSuccessResponse, errorHandler } from '../utils/setResponse.js';

/**
 * 
 * @param {*} request 
 * @param {*} response 
 */
export const create = async(request, response) => {
    try {
        const job = {...request.body };
        const newJob = await jobService.create(job);
        setSuccessResponse(newJob, response);
    } catch (e) {
        errorHandler(e.message, response);
    }
}

export const search = async(request, response) => {
    try {
        const jobs = await jobService.search();
        setSuccessResponse(jobs, response);
    } catch (e) {
        errorHandler(e.message, response);
    }
}

export const findById = async(request, response) => {
    try {
        const id = request.params.id;
        const jobs = await jobService.findById(id);
        setSuccessResponse(jobs, response);
    } catch (e) {
        errorHandler(e.message, response);
    }
}

export const deleteById = async(request, response) => {
    try {
        const id = request.params.id;
        const job = await jobService.deleteById(id);
        setSuccessResponse(job, response);
    } catch (e) {
        errorHandler(e.message, response);
    }
}

export const update = async(request, response) => {

    try {
        const id = request.params.id;
        const job = {...request.body, id };

        const updatedJob = await jobService.update(job);
        console.log(updatedJob)
        setSuccessResponse(updatedJob, response);

    } catch (e) {
        errorHandler(e, response);
    }
}