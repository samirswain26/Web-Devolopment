import express from "express";
import { login, registeruser, verifyUser } from "../controller/user.controller.js";

const router = express.Router()

router.post("/register", registeruser)
router.get("/verify:token", verifyUser)
router.post("/login", login)

export default router