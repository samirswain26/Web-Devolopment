import Router from "express"
import {getProjects, createProject} from "../controllers/project.controllers.js"
import { isLoggedIn } from "../middleware/validator.middleware.js"

const router = Router()
router.route("/create-project").post( isLoggedIn,createProject)


export default router