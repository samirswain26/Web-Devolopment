import Router from "express"
import {userRegistrationValidator} from "../validators/index.js"
import { validator } from "../middleware/validator.middleware.js"
import {registerUser} from "../controllers/auth.controllers.js"

const router = Router()

router.route("/register").post(userRegistrationValidator(), validator, registerUser)


export default router