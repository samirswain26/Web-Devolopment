import Router from "express"
import { attachFile, createTask, updateTask } from "../controllers/task.controllers.js"
import { isLoggedIn } from "../middleware/validator.middleware.js"
import { upload } from "../middleware/multer.middleware.js"

const router = Router()
    
router.route("/create-task").post(isLoggedIn, createTask)
router.route("/update-task").post(isLoggedIn, updateTask)
router.route("/attach-file").post(isLoggedIn, upload.single("file"),attachFile)


export default router