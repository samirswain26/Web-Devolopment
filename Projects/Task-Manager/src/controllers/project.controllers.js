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

    if(!Name || !description ){
      throw new ApiError(400, "All Fields are required")
    }
    console.log(Name)

    const existingProjectName = await Project.findOne({Name})
      
    if(existingProjectName){
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
      CreatedBy
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
      "Projected Created"
    ))
  
    } catch (error) {
        return res
        .status(500)
        .json(new ApiResponse(201, "Server Error", error.message));
    }
};


const getProjects = async(req, res) => {

}

const getProjectById = async (req, res) => {
  // get project by id
};


const updateProject = async (req, res) => {
  // update project
};

const deleteProject = async (req, res) => {
  // delete project
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
