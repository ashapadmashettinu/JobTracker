import Mongoose from "mongoose";
import address from "./address.js";
const Schema = Mongoose.Schema;


/**
 * composing the schema structure and validations for Users
 */
const UserSchema = new Mongoose.Schema({
    "uid": {
        type: String
    },
    "username": {
        type: String,
        required: "Username is required field"
    },
    "password": {
        type: String,
        required: "Password is required field",
        select: false
    },
    "confirmPassword": {
        type: String,
        required: "Confirm password is required field"
    },
    "confirmPassword": {
        type: String,
        required: "Confirm password is required field"
    },
    "firstName": {
        type: String,
        required: "firstName is required field"
    },
    "lastName": {
        type: String,
        required: "lastName is required field",
    },
    "dob": {
        type: Date,
        format: "DD-MM-YYYY"
    },
    "picture":{
        type:String
    },
    "email": {
        type: String,
    },
    "phone": {
        type: String,
    },
    "address": {
        type: address,
    },
    "auth": {
        type: String,
    },
    "about": {
        type: String
    },
    "education": {
        type: String
    },
    "skills": {
        type: String
    },
    "project": {
        type: String
    },
    "experience": {
        type: String
    },
}, {
    timestamps: {
        createdAt: "createdDate",
        updatedAt: "lastModifiedDate",
    },
}, {
    versionKey: false,
});

UserSchema.virtual("id", () => {
    return this._id.toHexString();
});

UserSchema.set("toJSON", { virtuals: true });
const Users = Mongoose.model("Users", UserSchema);

export default Users;