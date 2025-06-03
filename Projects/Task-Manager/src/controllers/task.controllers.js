import { Task } from "../models/task.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { Project } from "../models/project.models.js";
import { AvailableTaskStatus } from "../utils/constants.js";

const createTask = async (req, res) => {
    // Create task
    try {
        const {Name, title, description, username} = req.body
        if(!Name || !title || !description){
            throw new ApiError(403, "All fields are required.")
        }

        const currentUserId = req.user._id
        
        const project = await Project.findOne({Name})
        
        if(!project){
            throw new ApiError(404, "project not found.")
        }
        
        if(project.CreatedBy.toString() !== currentUserId.toString()){
            throw new ApiError(403, "Only admin can create the task")
        }

        // const assignedTo = req.user._id
        const user = await User.findOne({username})
        if(!user){
            throw new ApiError(404, "user not found")
        }

        const validatetask = await Task.findOne({title, project: project._id})
        if(validatetask){
            throw new ApiError(400, "Task already exists")
        }
        
        const task = await Task.create({
            title, 
            description,
            project: project._id ,
            assignedTo: user._id,
            assignedBy: currentUserId
        })

        if(!task){
            throw new ApiError(401, "Task not created")
        }

        console.log(task)


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
        throw new ApiError(500, error.message ?? "Something went wrong while creatin task")
    }
}

const updateTask = async (req, res) => {
    // Update the task

    try {
        const{title, status} = req.body
        console.log(title)
        
        if(!title || !status){
            throw new ApiError(400, "Both title and status are required to update the task")
        }
        
        if(!Object.values(AvailableTaskStatus).includes(status)){
            return res.status(400).json(
                new ApiResponse(
                    400,
                    Object.values(AvailableTaskStatus),
                    "Invalid status. Here are the valid options.",
                    false
                )
            );
        }
        
        
        const task = await Task.findOne({title})
        console.log(task)

        if(!task){
            throw new ApiError(404, "Task not found")
        }

        if(task.status === status){
            return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    task,
                    `Task is already in ${status} state`,
                    true
                )
            )
        }

        task.status = status

        await task.save()

        return res
        .status(200)
        .json(
            new ApiResponse(
                200, 
                task,
                "Status updated successfully"
            )
        )



    } catch (error) {
        throw new ApiError(500, error.message ??  "Could not update status")
    }
}

export {
    createTask,
    updateTask,
}