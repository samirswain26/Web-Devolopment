import Router from "express"
import { attachFile, createSubtask, createTask, deleteTask, getAttachedfile, getSubTasks, getTaskList, updateSubtask, updateTask } from "../controllers/task.controllers.js"
import { isLoggedIn } from "../middleware/validator.middleware.js"
import { upload } from "../middleware/multer.middleware.js"

const router = Router()
    
router.route("/create-task").post(isLoggedIn, createTask)
router.route("/update-task").post(isLoggedIn, updateTask)
router.route("/attach-file").post(isLoggedIn, upload.single("file"),attachFile)

router.route("/delete-task").post(isLoggedIn, deleteTask)
router.route("/task-list").post(isLoggedIn, getTaskList)
router.route("/get-attach-files").post(isLoggedIn, getAttachedfile)


// Sub-Task Routes
router.route("/create-subtask").post(isLoggedIn,createSubtask)
router.route("/update-subtask").post(isLoggedIn,updateSubtask)
router.route("/get-subtask").post(isLoggedIn,getSubTasks)



export default router