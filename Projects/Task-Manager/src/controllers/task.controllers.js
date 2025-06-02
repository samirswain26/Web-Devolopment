import { Task } from "../models/task.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { Project } from "../models/project.models.js";

const createTask = async (req, res) => {
    // Create task
    try {
        const {projectName, title, description} = req.body
        const currentUserId = req.user._id
        const assignedTo = req.user._id 
        
        console.log(projectName, title)

        // const currentUsername = currentUserId.Name 

        if(!projectName ?? !title ?? !description ?? !assignedTo ){
            throw new ApiError(400, "All fields are required")
        }


        const project = await Project.findOne({Name: projectName})

        if(!project){
            throw new ApiError(404, "project naot found")
        }

        if(project.CreatedBy.toString() !== currentUserId.toString()){
            throw new ApiError(403, "Only admin can create the task")
        }

        const user = await User.findOne({username})

        if(!user){
            throw new ApiError(404, "user not found.")
        }
        
        const task = await Task.create({
            title,
            description,
            project: project._id,
            assignedTo,
            assignedBy: currentUserId
        })

        return res
        .status(200)
        .json(
             new ApiResponse(
                200,
                task,
                "task created successfully"
            )
        )


    } catch (error) {
        throw new ApiError(500, error.message ?? "Something went wrong while creatin tas")
    }
}

export {
    createTask,
}