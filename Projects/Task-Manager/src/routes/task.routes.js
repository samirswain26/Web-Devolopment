import Router from "express"
import { createTask } from "../controllers/task.controllers.js"
import { isLoggedIn } from "../middleware/validator.middleware.js"

const router = Router()
    
router.route("/create-task").post(isLoggedIn, createTask)

export default router