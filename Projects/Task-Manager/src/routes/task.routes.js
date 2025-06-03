import Router from "express"
import { createTask, updateTask } from "../controllers/task.controllers.js"
import { isLoggedIn } from "../middleware/validator.middleware.js"

const router = Router()
    
router.route("/create-task").post(isLoggedIn, createTask)
router.route("/update-task").post(isLoggedIn, updateTask)


export default router