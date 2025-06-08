import Router from "express"
import { createnotes } from "../controllers/note.controllers.js"
import { isLoggedIn } from "../middleware/validator.middleware.js"
const router = Router()

router.route("/create-notes").post(isLoggedIn,createnotes)


export default router