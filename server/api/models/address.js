import mongoose from 'mongoose';
import address from "./address.js";

const Schema = mongoose.Schema

const addressSchema = new Schema({
    street: {
        type: String
    },
    city: {
        type: Object
    },
    state: {
        type: Object
    },
    country: {
        type: Object
    },
    zipcode: {
        type: Number
    }
})

export default addressSchema;