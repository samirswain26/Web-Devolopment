import Router from "express"
import {getProjects, createProject, getProjectById, deleteProject} from "../controllers/project.controllers.js"
import { isLoggedIn } from "../middleware/validator.middleware.js"

const router = Router()
router.route("/create-project").post( isLoggedIn,createProject)
router.route("/get-project").post( isLoggedIn,getProjects)
router.route("/get-project-By-Id").post(isLoggedIn ,getProjectById)
router.route("/delete-project").post(isLoggedIn ,deleteProject)


export default router