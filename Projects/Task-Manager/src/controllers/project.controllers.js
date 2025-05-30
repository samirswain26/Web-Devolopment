import { Stats } from "fs";
import {Project} from "../models/project.models.js"
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";


const createProject = async (req, res) => {
  // create project

  try {

    const {Name, description} = req.body
    const CreatedBy = req.user._id
    const admin = req.user.username

    if(!Name || !description ){
      throw new ApiError(400, "All Fields are required")
    }
    console.log(Name)

    const existingProjectName = await Project.findOne({Name})
      
    if(existingProjectName){
      console.log("Project name Already Exists")
      return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          "Project name Already Exists"
        )
      )
    }

    const project = await Project.create({
      Name,
      description,
      CreatedBy,
      admin
    })
    await project.save()

    console.log(project)

    if(!project){
        return new ApiError(401, errorMonitor.message || "Project not registered")
    }

    return res
    .status(201)
    .json(new ApiResponse(
      500,
      project,
      "Project Created"
    ))
  
    } catch (error) {
        return res
        .status(500)
        .json(new ApiResponse(201, "Server Error", error.message));
    }
};


const getProjects = async(req, res) => {
  // get all projects
try {
    const project = await Project.find().select("Name")
    console.log(project)
    return res
    .status(200)
    .json(new ApiResponse(
      200,
      project,
      "Project Lists"
    ))
} catch (error) {
  throw new ApiError(500, error.message || "Can not get the project list")
}
}

const getProjectById = async (req, res) => {
  // get project by id
  try {
    const project = await Project.find({CreatedBy: req.user._id})
    console.log(project)
    return res 
    .status(200)
    .json(new ApiResponse(
      200,
      project,
      "Project are listed by id's"
    ))
  } catch (error) {
    throw new ApiError(500, error.message || "can not get the projects by Id.")
  }
};


const updateProject = async (req, res) => {
  // update project
  try {
    const {Name, status} = req.body
    console.log(Name)
  
    if(!Name || !status){
      throw new ApiError(400, "Project Name  and status is necessary to update that Project")
    }
   
  
    const project = await Project.findOne({Name,CreatedBy: req.user._id})
  
    console.log(project)
  
    if(!project){
      throw new ApiResponse(400, "Project not found")
    }
  
    project.status = status
    console.log(status)
  
    await project.save()
  
    return res
    .status(200)
    .json(new ApiResponse(
      200,
      project,
      "Project Status updated successfully"
    )) 
  } catch (error) {
   throw new ApiError(500, error.message || "Failed to update project status")
  }
  
};

const deleteProject = async (req, res) => {
  // delete project
  try {
    const {Name} = req.body

    if(!Name){
      throw new ApiError(400, "Project name is required")
    }
    const project = await Project.findOne({Name, CreatedBy: req.user._id})
    console.log(project)
    if(!project){
      return res.status(400).json(
        new ApiResponse(400, null, "Project not found or not authorized to delete")
      )
    }
    
    const deletedProject = await Project.deleteOne({_id: project._id})
    console.log(deletedProject)
    if(deletedProject.deletedCount === 0){
      return res.status(400).json(
        new ApiResponse(400, null, "This project is not belong to the login user")
      )
    }
  
    return res.status(200).json(
      new ApiResponse(200, null, "Project deleted Successfully")
    )

  } catch (error) {
    throw new ApiError(500, error.message || "Failed to delete project")
  }
};

const getProjectMembers = async (req, res) => {
  // get project members

  
};

const requestToJoinProject = async (req, res) => {
  // Request to join a project

try {
    const {Name} = req.body
  
    if(!Name){
      throw new ApiError(400, "Project name is required")
    }
  
    const project = await Project.findOne({Name})
  
    if(!project){
      throw new ApiError(400, "Project name is invalid")
    }
  
    //It check that the user is trying to be in the group is the admin of the groupp or not...
    if (project.CreatedBy.toString() === req.user._id.toString()) {
        return res.status(400).json(
          new ApiResponse(400, null, "You are the admin of this project")
        );
    }
  
    // Check if already requested
    const alreadyRequested = project.joinrequest.some(
      (entry) => entry.userId.toString() === req.user._id.toString()
    );
  
    // Check if already a member
    const alreadyMember = project.members.some(
      (member) => member.toString() === req.user._id.toString()
    );
  
    if(alreadyRequested || alreadyMember){
      return res.status(400).json(new ApiResponse(400, null, "Already requested or a member"))
    }
  
    const joinlist = project.joinrequest.push({
      userId: req.user._id,
      username: req.user.username
    })
    console.log(joinlist)
    await project.save()
    return res.status(200).json(new ApiResponse(200, null, "Request to join sent"));
} catch (error) {
  throw new ApiError(500, error.message || "Failed to send the request")
}
}

const addMemberToProject = async (req, res) => {
  // add member to project
};

const deleteMember = async (req, res) => {
  // delete member from project
};

const updateMemberRole = async (req, res) => {
  // update member role
};

export {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateMemberRole,
  updateProject,
  requestToJoinProject
};
