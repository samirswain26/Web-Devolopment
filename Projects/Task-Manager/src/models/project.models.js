import mongoose, {Schema} from "mongoose";

const ProjectSchema = new Schema({
    Name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
    },
    CreatedBy:{
        type : Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps: true})

export const Project = mongoose.model("Project", ProjectSchema)