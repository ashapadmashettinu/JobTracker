
import Applications from "../models/application.js";

/**
 *
 * @param JSONObject application 
 * @returns 
 */
export const create = (application) => {
    const newApplication = new Applications(application);
    return newApplication.save();
}

export const search = (params = {}) => {
    return Applications.find(params).exec();
}

/**
 * 
 * @param String id 
 * @returns 
 */
export const findById = (id) => {
    return Applications.findById(id).exec();
}

/**
 * 
 * @param String id 
 * @returns 
 */
export const deleteById = (id) => {
    return Applications.findByIdAndDelete(id).exec();
}

/**
 * 
 * @param JSONObject application 
 * @returns 
 */
export const update = (application) => {
    const promise = Applications.findByIdAndUpdate(application.id, application, { new: true }).exec();
    return promise;
}