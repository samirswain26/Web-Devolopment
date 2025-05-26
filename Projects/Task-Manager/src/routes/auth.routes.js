import Router from "express"
import {userRegistrationValidator,userLoginValidator} from "../validators/index.js"
import { validator, isLoggedIn } from "../middleware/validator.middleware.js"
import {loginUser, registerUser,verifyEmail, getMe, logoutUser, resetForgottenPassword, changeCurrentPassword} from "../controllers/auth.controllers.js"

const router = Router()

router.route("/register").post(userRegistrationValidator(), validator, registerUser)
router.route("/verify/:token").get(verifyEmail)
router.route("/login").post(userLoginValidator(),validator , loginUser)
router.route("/profile").post(userLoginValidator(), isLoggedIn, getMe)
router.route("/logout").get(userLoginValidator(), isLoggedIn, logoutUser)
router.route("/forgot").post(userLoginValidator(), resetForgottenPassword)
router.route("/reset/:token").get(userLoginValidator(),changeCurrentPassword)
// router.get("/reset/:token", resetPassword)



export default router