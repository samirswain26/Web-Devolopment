import {Project} from "../models/project.models.js"
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import mongoose from "mongoose";


const createProject = async (req, res) => {
  // create project

  try {

    const {Name, description} = req.body
    const CreatedBy = req.user._id
    const username = req.user.username

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
      username
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
};
