import { Task } from "../models/task.models.js";
import { User } from "../models/user.models.js";
import { SubTask } from "../models/subtask.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { Project } from "../models/project.models.js";
import { AvailableTaskStatus, TaskStatusEnum } from "../utils/constants.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import path from "path";
import fs from "fs";

const createTask = async (req, res) => {
  // Create task
  try {
    const { Name, title, description, username } = req.body;
    if (!Name || !title || !description || !username) {
      throw new ApiError(403, "All fields are required.");
    }

    const currentUserId = req.user._id;

    const project = await Project.findOne({ Name });

    if (!project) {
      throw new ApiError(404, "project not found.");
    }

    // Check the user is admin or not
    if (project.CreatedBy.toString() !== currentUserId.toString()) {
      throw new ApiError(403, "Only admin can create the task");
    }

    const user = await User.findOne({ username });
    if (!user) {
      throw new ApiError(404, "user not found");
    }

    console.log(user);

    // check the user is in the project members list
    const isMember = project.members.some(
      (member) => member.userId.toString() === user._id.toString(),
    );
    console.log(isMember);

    if (!isMember) {
      throw new ApiError(403, "This user is not a member of the project");
    }

    const validatetask = await Task.findOne({ title, project: project._id });
    if (validatetask) {
      //   throw new ApiError(400, "Task already exists in this project");
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Task Already Exists In This Project."));
    }

    const task = await Task.create({
      title,
      description,
      project: project._id,
      assignedTo: user._id,
      assignedBy: currentUserId,
    });

    if (!task) {
      throw new ApiError(401, "Task not created");
    }

    console.log(task);

    return res
      .status(200)
      .json(new ApiResponse(200, task, "Task Created Successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      error.message ?? "Something went wrong while creating task !",
    );
  }
};

const updateTask = async (req, res) => {
  // Update the task

  try {
    const { title, status } = req.body;
    console.log(title);
    console.log(status);

    if (!title || !status) {
      throw new ApiError(
        400,
        "Both title and status are required to update the task",
      );
    }

    if (!Object.values(AvailableTaskStatus).includes(status)) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            Object.values(AvailableTaskStatus),
            "Invalid status. Here are the valid options.",
            false,
          ),
        );
    }

    const task = await Task.findOne({ title });
    console.log(task);

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    if (task.status === status) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            task,
            `Task is already in ${status} state`,
            true,
          ),
        );
    }

    task.status = status;

    await task.save();

    return res
      .status(200)
      .json(new ApiResponse(200, task, "Status updated successfully"));
  } catch (error) {
    throw new ApiError(500, error.message ?? "Could not update status");
  }
};

const attachFile = async (req, res) => {
  try {
    const { title } = req.body;
    console.log(title);

    if (!req.file || !title) {
      throw new ApiError(400, "File and title are required");
    }

    // Validate file mimetype
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      throw new ApiError(400, "Only JPG, PNG, and PDF files are allowed");
    }

    const task = await Task.findOne({ title });

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    // this fileUrl is the file uploaded in the server that contain filename (basically from multer)
    const fileUrl = `/images/${req.file.filename}`;

    // Shows the multer file that has been stored in the server....
    console.log(req.file);

    const localFilePath = path.join(
      process.cwd(),
      req.file.destination,
      req.file.filename,
    );

    // Confirm that file exists
    if (!fs.existsSync(localFilePath)) {
      throw new ApiError(500, "Uploaded file not found on server");
    }

    const cloudinaryResponse = await uploadOnCloudinary(localFilePath, {
      folder: "Task",
      type: "private",
    });

    console.log(cloudinaryResponse);

    if (!cloudinaryResponse) {
      throw new ApiError(500, "cloudinary upload failed");
    }

    // const result = await cloudinary.uploader.upload(filePath);
    // console.log(result.secure_url); // ✅ use this!

    const fileMeta = {
      url: cloudinaryResponse.secure_url,
      mimetype: req.file.mimetype,
      size: req.file.size,
    };

    task.attachments.push(fileMeta);
    await task.save();

    return res
      .status(200)
      .json(new ApiResponse(200, fileMeta, "File attached successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Something went wrong");
  }
};

const deleteTask = async (req, res) => {
  // Detele the task
  console.log("Received request body:", req.body);

  try {
    const { title } = req.body;

    if (!title) {
      throw new ApiError(400, "Task title is required");
    }

    const task = await Task.findOne({ title, assignedBy: req.user._id });

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    // Delete the Sub-tasks when the task will be deletd
    const deletesubTask = await SubTask.deleteMany({ task: task._id });
    console.log(`Deleted task is ${deletesubTask}`);

    const deletedTask = await Task.deleteOne({ _id: task._id });
    console.log(deletedTask);

    if (deletedTask.deletedCount === 0) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            null,
            "This task is not belong to the login user/admin",
          ),
        );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Task deleted Successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong while deleting the task",
    );
  }
};

const getTaskList = async (req, res) => {
  // Get the task list
  const { Name } = req.body;
  console.log(Name);
  try {
    if (!Name) {
      throw new ApiError(400, "Task title is required");
    }

    const project = await Project.findOne({ Name });

    if (!project) {
      throw new ApiError(404, "project not found.");
    }

    console.log(project);
    const task = await Task.find({ project: project._id });
    console.log(task);

    if (!task) {
      throw new ApiError(404, "tasks not found");
    }

    const Tasktitle = task.map((task) => task.title);
    console.log(Tasktitle);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          Tasktitle,
          "Successfully fetched the task list of the project",
        ),
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong while retriving task list",
    );
  }
};

const getAttachedfile = async (req, res) => {
  // Get the attached files
  try {
    const { title } = req.body;

    if (!title) {
      throw new ApiError(403, "Task title is required");
    }

    const task = await Task.findOne({ title });
    console.log(task);

    const files = task.attachments;
    console.log(files);

    res.status(200).json({
      success: true,
      files,
    });
  } catch (error) {
    throw new ApiError(
      500,
      error.message ||
        "Something went wrong while fetching the files from the server.",
    );
  }
};

const createSubtask = async (req, res) => {
  // Create sun task for specific task
  try {
    const { title, tasktitle } = req.body;
    console.log(title);

    if (!title || !tasktitle) {
      throw new ApiError(403, "All fields are required for creating sub-task");
    }

    const currentUserId = req.user._id;
    console.log(currentUserId);

    const task = await Task.findOne({ title: tasktitle }).select(
      "-attachments",
    );
    console.log(task);

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    const isTaskCreator =
      task.assignedBy.toString() === currentUserId.toString();
    const isAssignedUser =
      task.assignedTo?.toString() === currentUserId.toString();

    if (!isTaskCreator && !isAssignedUser) {
      throw new ApiError(
        403,
        "Only task creator or assigned user can create the subtask",
      );
    }

    const existingSubtask = await SubTask.findOne({ title, task: task._id });
    if (existingSubtask) {
      throw new ApiError(400, "This Sub-task already exists in this Task");
    }
    const validatSubetask = await SubTask.findOne({ title, task: task._id });
    if (validatSubetask) {
      throw new ApiError(400, "Sub-Task already exists in this Task");
    }

    const subtask = await SubTask.create({
      title,
      task: task._id,
      createdBy: currentUserId,
    });

    console.log(subtask);

    return res
      .status(200)
      .json(new ApiResponse(200, subtask, "task created successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong while creating sub-task",
    );
  }
};

const updateSubtask = async (req, res) => {
  // Upadate the sub-task status

  try {
    const { title, isCompleted } = req.body;
    if (!title || typeof isCompleted === "undefined") {
      throw new ApiError(403, "Both title and isCompleted fields are required");
    }

    // Validate if isCompleted is strictly boolean
    if (typeof isCompleted !== "boolean") {
      throw new ApiError(
        400,
        "The isCompleted field must be either true or false (Boolean only)",
      );
    }

    const task = await SubTask.findOne({ title });
    if (!task) {
      throw new ApiError(404, "Sub task not found");
    }

    task.isCompleted = isCompleted;

    await task.save();
    console.log(task);

    return res
      .status(200)
      .json(new ApiResponse(200, isCompleted, "Sub-task updated successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong while updating sub-task",
    );
  }
};

const getSubTasks = async (req, res) => {
  //  Get all the subtasks
  try {
    const { title } = req.body;

    if (!title) {
      throw new ApiError(
        403,
        "Task title is required to get all the sub-task of it.",
      );
    }

    const task = await Task.findOne({ title });

    if (!task) {
      throw new ApiError(404, "Task not found.");
    }

    const subtasks = await SubTask.find({ task });
    console.log(subtasks);

    return res
      .status(200)
      .json(new ApiResponse(200, subtasks, "Sub-tasks fetched successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong while updating sub-task",
    );
  }
};

const deleteSubTask = async (req, res) => {
  try {
    const { title, isCompleted } = req.body;

    if (!title || typeof isCompleted !== "boolean") {
      throw new ApiError(
        403,
        "Title and isCompleted (as boolean) are required",
      );
    }

    const task = await SubTask.findOne({ title });

    if (!task) {
      throw new ApiError(404, "Sub-task not found");
    }

    if (isCompleted === true) {
      const message = task.isCompleted
        ? "Sub-task was already completed. Deleting now."
        : "Sub-task marked as completed and deleted.";

      const deletedTask = await SubTask.findOneAndDelete({ _id: task._id });

      return res.status(200).json(new ApiResponse(200, deletedTask, message));
    } else {
      if (task.isCompleted === false) {
        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              task,
              "Sub-task is already marked as not completed",
            ),
          );
      }

      task.isCompleted = false;
      await task.save();

      return res
        .status(200)
        .json(new ApiResponse(200, task, "Sub-task marked as not completed"));
    }
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong while deleting sub-task",
    );
  }
};

export {
  createTask,
  updateTask,
  attachFile,
  deleteTask,
  getTaskList,
  getAttachedfile,
  createSubtask,
  updateSubtask,
  getSubTasks,
  deleteSubTask,
};
