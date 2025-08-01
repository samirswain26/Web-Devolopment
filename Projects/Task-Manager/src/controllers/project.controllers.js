import { Project } from "../models/project.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { Task } from "../models/task.models.js";

const createProject = async (req, res) => {
  // create project

  try {
    const { Name, description } = req.body;
    const CreatedBy = req.user._id;
    const admin = req.user.username;

    if (!Name || !description) {
      throw new ApiError(400, "All Fields are required");
    }
    console.log(Name);

    const existingProjectName = await Project.findOne({ Name });

    if (existingProjectName) {
      console.log("Project name Already Exists");
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Project Name Already Exists"));
    }

    const project = await Project.create({
      Name,
      description,
      CreatedBy,
      admin,
      members: [
        {
          userId: CreatedBy,
          username: admin,
        },
      ], // Add admin as the first member
    });

    console.log(project);

    if (!project) {
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Project registration failed"));
    }

    return res
      .status(201)
      .json(new ApiResponse(201, project, "Project Created"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, "Server Error"));
  }
};

const getProjects = async (req, res) => {
  // get all projects
  try {
    const project = await Project.find()
      .select("Name")
      .select("description")
      .select("admin");
    console.log(project);
    return res.status(200).json(new ApiResponse(200, project, "Project Lists"));
  } catch (error) {
    throw new ApiError(500, error.message || "Can not get the project list");
  }
};

const getProjectById = async (req, res) => {
  // get project by id
  try {
    const project = await Project.find({ CreatedBy: req.user._id });
    console.log(project);
    return res
      .status(200)
      .json(new ApiResponse(200, project, "Project are listed by id's"));
  } catch (error) {
    throw new ApiError(500, error.message || "can not get the projects by Id.");
  }
};

const updateProject = async (req, res) => {
  // update project
  try {
    const { Name, status } = req.body;
    console.log(Name);

    if (!Name || !status) {
      throw new ApiError(
        400,
        "Project Name  and status is necessary to update that Project",
      );
    }

    const project = await Project.findOne({ Name, CreatedBy: req.user._id });

    console.log(project);

    if (!project) {
      throw new ApiResponse(400, "Project not found");
    }

    project.status = status;
    console.log(status);

    await project.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, project, "Project Status updated successfully"),
      );
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to update project status");
  }
};

const deleteProject = async (req, res) => {
  // delete project
  try {
    const { Name } = req.body;

    if (!Name) {
      throw new ApiError(400, "Project name is required");
    }
    const project = await Project.findOne({ Name, CreatedBy: req.user._id });
    console.log(project);
    if (!project) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            null,
            "Project not found or not authorized to delete",
          ),
        );
    }

    const deletedProject = await Project.deleteOne({ _id: project._id });
    console.log(deletedProject);

    // Delete the tasks when the project will be deletd
    const deleteTask = await Task.deleteMany({ project: project._id });
    console.log(`Deleted task is ${deleteTask}`);

    if (deletedProject.deletedCount === 0) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            null,
            "This project is not belong to the login user",
          ),
        );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, deletedProject, "Project deleted Successfully"),
      );
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to delete project");
  }
};

const getProjectMembers = async (req, res) => {
  // get project members
  try {
    const { Name } = req.body;
    if (!Name) {
      throw new ApiError(400, "Project name Field is required");
    }

    const project = await Project.findOne({ Name });

    console.log("Full project object:", project);
    console.log("CreatedBy field:", project?.CreatedBy);
    console.log("CreatedBy type:", typeof project?.CreatedBy);
    console.log("Current user ID:", req.user._id);
    console.log("Current user ID type:", typeof req.user._id);

    if (!project) {
      throw new ApiError(400, "Project name is invalid");
    }

    const currentUserId = req.user._id.toString();
    const projectCreatorId = project.CreatedBy.toString();

    console.log("Current user ID (string):", currentUserId);
    console.log("Project creator ID (string):", projectCreatorId);

    // Check if the requesting user is the admin (project creator)
    const isAdmin = currentUserId === projectCreatorId;

    console.log("Is admin:", isAdmin);

    // Check if the requesting user is a member of the project
    const isMember =
      project.members &&
      project.members.length > 0 &&
      project.members.some(
        (member) => member.userId.toString() === currentUserId,
      );

    console.log("Is member:", isMember);

    // Allow access only if user is admin or a member
    if (!isAdmin && !isMember) {
      return res
        .status(403)
        .json(
          new ApiResponse(
            403,
            null,
            "Access denied. Only project admin or members can view the member list",
          ),
        );
    }

    // Prepare the response data
    const responseData = {
      projectInfo: {
        name: project.Name,
        description: project.description,
        status: project.status,
        admin: project.admin,
      },
      members: project.members || [],
      totalMembers: project.members ? project.members.length : 0,
      userRole: isAdmin ? "admin" : "member",
    };

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          responseData,
          "Project member list retrive successfully",
        ),
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wromh while fetching the member list",
    );
  }
};

const getRequestList = async (req, res) => {
  try {
    const { Name } = req.body;
    if (!Name) {
      throw new ApiError(400, "Project name Field is required");
    }

    const project = await Project.findOne({ Name });
    console.log("Full project object:", project);

    if (!project) {
      throw new ApiError(400, "Project name is invalid");
    }

    const requestList = project.joinrequest;

    if (!requestList || requestList.length === 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, [], "Join request list is empty"));
    }

    const b = requestList.map((a) => a.username);
    console.log(requestList);
    console.log(b);

    return res
      .status(200)
      .json(new ApiResponse(200, requestList, "Request List"));
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wromh while fetching the request list",
    );
  }
};

const requestToJoinProject = async (req, res) => {
  // Request to join a project

  try {
    const { Name } = req.body;

    if (!Name) {
      throw new ApiError(400, "Project name is required");
    }

    const project = await Project.findOne({ Name });

    if (!project) {
      throw new ApiError(400, "Project name is invalid");
    }

    //It check that the user is trying to be in the group is the admin of the groupp or not...
    if (project.CreatedBy.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "You are the admin of this project"));
    }

    // Check if already requested
    const alreadyRequested = project.joinrequest.some(
      (entry) => entry.userId.toString() === req.user._id.toString(),
    );

    // Check if already a member
    const alreadyMember = project.members.some(
      (member) => member.toString() === req.user._id.toString(),
    );

    if (alreadyRequested || alreadyMember) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Already requested or a member"));
    }

    const joinlist = project.joinrequest.push({
      userId: req.user._id,
      username: req.user.username,
    });

    console.log(joinlist);

    await project.save();

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Request to join sent"));
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to send the request");
  }
};

const addMemberToProject = async (req, res) => {
  // add member to project
  try {
    const { Name, username } = req.body;
    if (!Name || !username) {
      throw new ApiError(400, "Project Name and username is required");
    }
    console.log(Name);

    const project = await Project.findOne({ Name });
    console.log(project);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    // Only Admin can accept members into the team
    if (project.CreatedBy.toString() !== req.user._id.toString()) {
      throw new ApiError(400, "Only admin can accepts members into the team");
    }

    // The User is required for determining was in the joinrequest list or not.
    const user = await User.findOne({ username });

    if (!user) {
      throw new ApiError(404, "User not found in the requested list");
    }

    const hasRequested = project.joinrequest.some(
      (id) => id.userId.toString() === user._id.toString(),
    );

    if (!hasRequested) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, null, "User did not requested to join the team"),
        );
    }

    const alreadyMember = project.members.some(
      (member) => member.userId.toString() === user._id.toString(),
    );

    if (alreadyMember) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "User already a member"));
    }

    // Moves users to joinrequest list to members list
    project.members.push({
      userId: user._id,
      username: user.username,
    });

    project.joinrequest = project.joinrequest.filter(
      (id) => id.userId.toString() !== user._id.toString(),
    );

    await project.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          project.members,
          "User added to the project successfully",
        ),
      );
  } catch (error) {
    throw new ApiError(500, error.message || "Can not add the member");
  }
};

const deleteMember = async (req, res) => {
  // delete member from project

  try {
    const { Name, username } = req.body;

    if (!Name || !username) {
      throw new ApiError(400, "project name and username are required");
    }

    const project = await Project.findOne({ Name });
    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    const adminid = req.user._id.toString();
    const projectCreatorId = project.CreatedBy.toString();

    const isadmin = adminid === projectCreatorId;

    if (!isadmin) {
      return res
        .status(403)
        .json(
          new ApiResponse(403, null, "Only project admin can delete members"),
        );
    }

    // Check if admin is trying to delete themselves
    if (username === req.user.username) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            null,
            "You are the admin of this project, you cannot delete yourself from the team",
            false,
          ),
        );
    }

    const memberIndex = project.members.findIndex(
      (member) => member.username === username,
    );

    if (memberIndex === -1) {
      throw new ApiError(404, "Member not found in the project");
    }
    project.members.splice(memberIndex, 1);

    await project.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          project.members,
          `Member '${username}' deleted successfully`,
        ),
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "something went wrong while deleting the member",
    );
  }
};

const updateMemberRole = async (req, res) => {
  // update member role

  try {
    const { Name, username, role } = req.body;
    const currentUserId = req.user._id;

    const project = await Project.findOne({ Name });

    if (!project) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Project not found"));
    }

    // only admin can change the role of members
    if (project.CreatedBy.toString() !== currentUserId.toString()) {
      return res
        .status(403)
        .json(
          new ApiResponse(403, null, "Only admin can update the member role"),
        );
    }

    const member = project.members.find(
      (find) => find.username.toString() === username.toString(),
    );
    if (!member) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Member not found."));
    }

    // update role
    member.role = role;

    await project.save();

    return res
      .status(200)
      .json(new ApiResponse(200, member, "Member role upldated successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Somethig went wrong while updating members role.",
    );
  }
};

const iamInTheProject = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "User not authenticated"));
    }

    const currentUserId = req.user._id.toString();

    // Find all projects where user is either admin or member
    const projects = await Project.find({
      $or: [
        { CreatedBy: req.user._id }, // Projects where user is admin
        { "members.userId": req.user._id }, // Projects where user is a member
      ],
    }).select("Name description status admin CreatedBy members");

    if (!projects || projects.length === 0) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { projects: [], totalProjects: 0 },
            "You are not part of any projects",
          ),
        );
    }

    // Map projects with user role information
    const projectsWithRole = projects.map((project) => {
      const isAdmin = project.CreatedBy.toString() === currentUserId;

      return {
        _id: project._id,
        Name: project.Name,
        description: project.description,
        status: project.status,
        admin: project.admin,
        totalMembers: project.members ? project.members.length : 0,
        // userRole: isAdmin ? "admin" : "member",
        userRole: isAdmin
          ? "Admin"
          : project.members && project.members.length > 0
            ? project.members[0].role
            : "Member",
      };
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          projects: projectsWithRole,
          totalProjects: projectsWithRole.length,
        },
        "Projects retrieved successfully",
      ),
    );
  } catch (error) {
    console.error("Error in iamInTheProject:", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          error.message || "Failed to retrieve user projects",
        ),
      );
  }
};

const transferAdminship = async (req, res) => {
  try {
    const { Name, newAdminUsername } = req.body;

    if (!Name || !newAdminUsername) {
      throw new ApiError(
        400,
        "Project name and new admin username are required",
      );
    }

    const project = await Project.findOne({ Name });
    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    // Only current admin can transfer adminship
    if (project.CreatedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json(
          new ApiResponse(
            403,
            null,
            "Only current admin can transfer adminship",
          ),
        );
    }

    // Find the new admin in members
    const newAdmin = project.members.find(
      (member) => member.username === newAdminUsername,
    );
    if (!newAdmin) {
      throw new ApiError(404, "New admin must be a project member");
    }

    // Update admin information
    project.CreatedBy = newAdmin.userId;
    project.admin = newAdmin.username;

    await project.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, project, "Adminship transferred successfully"),
      );
  } catch (error) {
    console.error("Error transferring adminship:", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          error.message || "Error transferring adminship",
        ),
      );
  }
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
  requestToJoinProject,
  getRequestList,
  iamInTheProject,
  transferAdminship,
};
