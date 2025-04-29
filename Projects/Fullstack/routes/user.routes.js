import express from "express";
import { kk, registeruser } from "../controller/user.controller.js";

const router = express.Router()

router.get("/register", registeruser)
router.get("/kk", kk)

export default router