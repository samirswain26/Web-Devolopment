import { ProjectNotes } from "../models/note.models.js";
import { Project } from "../models/project.models.js";
import { ApiError } from "../utils/api-error.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";

const createnotes = async (req, res) => {
    // Create notes
    try {

        const {Name, content} = req.body

        console.log(Name, content)

        if(!Name || !content){
            throw new ApiError(403, "All fields are required")
        }
        
        const project = await Project.findOne({Name})
        console.log(project._id)
        
        if(!project){
            throw new ApiError(404, "Project not found")
        }
        
        const currentUserId = req.user._id.toString()

        // Check if the requesting user is a member of the project
        const isMember = project.members && project.members.length > 0 && 
        project.members.some(member => member.userId.toString() === currentUserId)

        console.log("Is member:", isMember)


        const projectnotes = await ProjectNotes.create({
            project: project._id,
            CreatedBy: currentUserId,
            content: content
        })


        return res.status(200).json(
            new ApiResponse(200, projectnotes, "Project notes created successfully."
            )
        )


    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while creating Notes.")
    }

}

const deletenote = async(req, res) => {
    // Delete notes

}

export {
    createnotes,
    deletenote
}