import Router from "express"
import {userRegistrationValidator} from "../validators/index.js"
import { validator } from "../middleware/validator.middleware.js"
import {loginUser, registerUser,verifyEmail} from "../controllers/auth.controllers.js"

const router = Router()

router.route("/register").post(userRegistrationValidator(), validator, registerUser)
router.route("/verify/:token").get(verifyEmail)
router.route("/login").post(loginUser)


export default router