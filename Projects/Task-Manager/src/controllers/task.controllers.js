import { Task } from "../models/task.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

const createTask = async (req, res) => {
    // Create task
try {
    const {Name, title, description, assignedTo} = req.body
    
    if(!Name ?? !title ?? !description ?? !assignedTo ){
        throw new ApiError(400, "All fields are required")
    }

    const task = await Task.create({
        title,
        description,
        project: project.Name,
        assignedTo,
        assignedBy: req.user._id
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