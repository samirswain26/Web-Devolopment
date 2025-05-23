import Router from "express"
import {userRegistrationValidator,userLoginValidator} from "../validators/index.js"
import { validator, isLoggedIn } from "../middleware/validator.middleware.js"
import {loginUser, registerUser,verifyEmail, getMe} from "../controllers/auth.controllers.js"

const router = Router()

router.route("/register").post(userRegistrationValidator(), validator, registerUser)
router.route("/verify/:token").get(verifyEmail)
router.route("/login").post(userLoginValidator(),validator , loginUser)
router.route("/profile").post( isLoggedIn, getMe)


export default router