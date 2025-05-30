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
    status:{
        type: String,
        trim: true,
        default: "pending",
    },
    admin:{
        type : String,
        ref : "User",
        required: true
    },
    CreatedBy:{
        type : Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            username: String
        }
    ],
    joinrequest: [
    {
        userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
        },
        username: {
        type: String
        }
    }
]
},{timestamps: true})

export const Project = mongoose.model("Project", ProjectSchema)