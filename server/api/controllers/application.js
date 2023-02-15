import * as applicationService from '../services/application.js'
import { setSuccessResponse, errorHandler } from '../utils/setResponse.js';
import * as jobServive from '../services/job.js';
import * as userServive from '../services/user.js';

/**
 * 
 * @param {*} request 
 * @param {*} response 
 */
export const create = async(request, response) => {
    try {
        const application = {...request.body };
        const newApplication = await applicationService.create(application);
        const job = await jobServive.findById(request.body.jobId);
        newApplication.job = job;
        setSuccessResponse(newApplication, response);
    } catch (e) {
        errorHandler(e.message, response);
    }
}

export const search = async(request, response) => {
    try {
        const applications = await applicationService.search();
        for(let i=0;i<applications.length;i++){
            applications[i].job = await jobServive.findById(applications[i].jobId);
        }
        setSuccessResponse(applications, response);
    } catch (e) {
        errorHandler(e.message, response);
    }
}

export const findById = async(request, response) => {
    try {
        const id = request.params.id;
        const applications = await applicationService.findById(id);
        setSuccessResponse(applications, response);
    } catch (e) {
        errorHandler(e.message, response);
    }
}

export const deleteById = async(request, response) => {
    try {
        const id = request.params.id;
        const application = await applicationService.deleteById(id);
        setSuccessResponse(application, response);
    } catch (e) {
        errorHandler(e.message, response);
    }
}

export const update = async(request, response) => {

    try {
        const id = request.params.id;
        const application = {...request.body, id };

        const updatedApplication = await applicationService.update(application);
        setSuccessResponse(updatedApplication, response);

    } catch (e) {
        errorHandler(e, response);
    }
}