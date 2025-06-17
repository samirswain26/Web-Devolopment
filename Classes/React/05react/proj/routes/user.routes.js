import express from "express";
import { login, registeruser, verifyUser, getMe, logoutUser, forgotPassword, resetPassword, me, Someme } from "../controller/user.controller.js";
import {isLoggedIn} from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/register", registeruser)
router.get("/verify/:token", verifyUser)
router.post("/login", login)
router.get("/me", isLoggedIn ,getMe)
router.get("/logout", isLoggedIn ,logoutUser)
router.post("/forgot", isLoggedIn,forgotPassword)
router.get("/reset/:token", resetPassword)

router.get("/coders", me)
router.get("/Someme", Someme)

export default router