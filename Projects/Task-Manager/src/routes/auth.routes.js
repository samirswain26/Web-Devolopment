import Router from "express";
import {
  userRegistrationValidator,
  userLoginValidator,
} from "../validators/index.js";
import { validator, isLoggedIn } from "../middleware/validator.middleware.js";
import {
  loginUser,
  registerUser,
  verifyEmail,
  logoutUser,
  resetForgottenPassword,
  changeCurrentPassword,
  getCurrentUser,
  refreshAccessToken,
  resendEmailVerification,
  forgotPasswordRequest,
} from "../controllers/auth.controllers.js";

const router = Router();

router
  .route("/register")
  .post(userRegistrationValidator(), validator, registerUser);
router.route("/login").post(userLoginValidator(), validator, loginUser);
router.route("/verify/:token").get(verifyEmail);
router.route("/forgot").post(resetForgottenPassword);
router.route("/reset/:token").post(changeCurrentPassword);
router.route("/resendtoken").post(resendEmailVerification);
router.route("/forgot-request").post(forgotPasswordRequest);

// Secure Routes

router.route("/profile").get(isLoggedIn, getCurrentUser);
router.route("/logout").post(isLoggedIn, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
