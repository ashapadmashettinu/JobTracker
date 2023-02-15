
import Jobs from "../models/job.js";

/**
 *
 * @param JSONObject job 
 * @returns 
 */
export const create = (job) => {
    const newJob = new Jobs(job);
    return newJob.save();
}

export const search = (params = {}) => {
    return Jobs.find(params).exec();
}

/**
 * 
 * @param String id 
 * @returns 
 */
export const findById = (id) => {
    return Jobs.findById(id).exec();
}

/**
 * 
 * @param String id 
 * @returns 
 */
export const deleteById = (id) => {
    return Jobs.findByIdAndDelete(id).exec();
}

/**
 * 
 * @param JSONObject job 
 * @returns 
 */
export const update = (job) => {
    return Jobs.findByIdAndUpdate(job.id, job, { new: true }).exec();
}