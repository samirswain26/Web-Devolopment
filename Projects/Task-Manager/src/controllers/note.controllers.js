import { ProjectNotes, TaskNotes } from "../models/note.models.js";
import { Project } from "../models/project.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { Task } from "../models/task.models.js";

const createnotes = async (req, res) => {
  // Create notes
  try {
    const { Name, content } = req.body;

    console.log(Name, content);

    if (!Name || !content) {
      throw new ApiError(403, "All fields are required");
    }

    const project = await Project.findOne({ Name });
    console.log(project._id);

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    const currentUserId = req.user._id.toString();

    // Check if the requesting user is a member of the project
    const isMember =
      project.members &&
      project.members.length > 0 &&
      project.members.some(
        (member) => member.userId.toString() === currentUserId,
      );

    console.log("Is member:", isMember);

    const projectnotes = await ProjectNotes.create({
      project: project._id,
      CreatedBy: currentUserId,
      content: content,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          projectnotes,
          "Project notes created successfully.",
        ),
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong while creating Notes.",
    );
  }
};

const getProjectNotes = async (req, res) => {
  try {
    const { Name } = req.body;

    if (!Name) {
      throw new ApiError(403, "Project Name is required");
    }

    const project = await Project.findOne({ Name });
    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    const notes = await ProjectNotes.find({ project: project._id })
      .populate("CreatedBy", "username")
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, notes, "Project notes fetched successfully."));
  } catch (error) {
    throw new ApiError(500, error.message || "Error fetching notes");
  }
};

const createTaskNotes = async (req, res) => {
  // Create notes
  try {
    const { title, content } = req.body;

    console.log("Received title and content is :", title, content);

    if (!title || !content) {
      throw new ApiError(403, "All fields are required");
    }

    const task = await Task.findOne({ title });

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    console.log("Found task ID :", task);
    const currentUserId = req.user._id.toString();

    const Tasknotes = await TaskNotes.create({
      Task: task._id,
      CreatedBy: currentUserId,
      content: content,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, Tasknotes, "Task notes created successfully."),
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong while creating Notes.",
    );
  }
};

const getTasktNotes = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      throw new ApiError(403, "Task Name is required");
    }

    const task = await Task.findOne({ title });
    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    const notes = await TaskNotes.find({ Task: task._id })
      .populate("CreatedBy", "username")
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, notes, "Task notes fetched successfully."));
  } catch (error) {
    throw new ApiError(500, error.message || "Error fetching notes");
  }
};

export { createnotes, getProjectNotes, createTaskNotes, getTasktNotes };
