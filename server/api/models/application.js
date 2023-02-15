'use strict'
import address from "./address.js";
import Mongoose from "mongoose";
const Schema = Mongoose.Schema;

const ApplicationSchema = new Schema({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Jobs',
    required: true
  },
  applicantId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  recruiterId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  firstName: {
    type: String,
    required: "firstName is required field",
  },
  lastName: {
    type: String,
    required: "lastName is required field",
  },
  email: {
    type: 'String',
    required: true
  },
  phone: {
    type: 'String'
  },
  address: {
    type: address
  },
  jobTitle:{
    type:String
  },
  company:{
      type:String
  },
  resume: {
    type: String,
    required: true
  },
  cover_letter: {
    type: String
  },
  disability: {
    type: String
  },
  status:{
    type:String,
    default:"Applied"
  }
}, {
    timestamps: {
        createdAt: "createdDate",
        updatedAt: "lastModifiedDate"
    }
}, {
    versionKey: false
});

ApplicationSchema.virtual("id", () => {
    return this._id.toHexString()
});

ApplicationSchema.set("toJSON", { virtuals: true });
const Applications = Mongoose.model('Applications', ApplicationSchema);

export default Applications;