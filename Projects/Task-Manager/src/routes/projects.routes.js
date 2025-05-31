import Router from "express"
import {getProjects, createProject, getProjectById, deleteProject, updateProject, requestToJoinProject, addMemberToProject, getProjectMembers, deleteMember, updateMemberRole} from "../controllers/project.controllers.js"
import { isLoggedIn } from "../middleware/validator.middleware.js"

const router = Router()
router.route("/create-project").post( isLoggedIn,createProject)
router.route("/get-project").post( isLoggedIn,getProjects)
router.route("/get-project-By-Id").post(isLoggedIn ,getProjectById)
router.route("/delete-project").post(isLoggedIn ,deleteProject)
router.route("/update-project").post(isLoggedIn ,updateProject)
router.route("/request-project").post(isLoggedIn ,requestToJoinProject)
router.route("/member-project").post(isLoggedIn ,addMemberToProject)
router.route("/get-project-member").post(isLoggedIn ,getProjectMembers)
router.route("/delete-project-member").post(isLoggedIn ,deleteMember)
router.route("/update-member-role").post(isLoggedIn ,updateMemberRole)



export default router