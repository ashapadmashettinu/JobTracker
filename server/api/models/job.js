import Mongoose from "mongoose";
import address from "./address.js";

const Schema = Mongoose.Schema;

//type: SchemaTypes.Double
/**
 * composing the schema structure and validations for Users
 */
const JobSchema = new Mongoose.Schema({
    recruiter: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    jobTitle: {
        type: String,
        required: "JobTitle is required field",
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    salary: {
        type: Number // {min:0, max:0}
    },
    employmentType: {
        type: String
    },
    experienceRequired: {
        type: Number,
    },
    company: {
        type: String,
    },
    activeUntilDate: {
        type: Date,
    },
    email: {
        type: String,
    },
    address: {
        type: address
    },
    logo:{
        type:String
    },
    status:{
      type:Boolean,
      default:false
    }
}, {
    timestamps: {
        createdAt: "createdDate",
        updatedAt: "lastModifiedDate",
    },
}, {
    versionKey: false,
});

JobSchema.virtual("id", () => {
    return this._id.toHexString();
});

JobSchema.set("toJSON", { virtuals: true });
const Jobs = Mongoose.model("Jobs", JobSchema);

export default Jobs;