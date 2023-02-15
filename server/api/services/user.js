import Users from "../models/user.js";
import bcrypt from 'bcryptjs';

 /*
 * @param JSONObject user 
 * @returns 
 */
export const create = (user) => {
     const newUser = new Users(user);
     return newUser.save();
}

export const search = (params = {}) => {
    return Users.find(params).exec();
}

export const findOne = (params = {}) => {
    return Users.findOne(params).select('+password').exec();
}

/**
 * 
 * @param String id 
 * @returns 
 */
export const findById = (id) => {
    return Users.findById(id).exec();
}

/**
 * 
 * @param String id 
 * @returns 
 */
export const deleteById = (id) => {
    return Users.findByIdAndDelete(id).exec();
}

/**
 * 
 * @param JSONObject user 
 * @returns 
 */
export const update = (user) => {
    const promise = Users.findByIdAndUpdate(user.id, user, { new: true }).exec();
    return promise;
}