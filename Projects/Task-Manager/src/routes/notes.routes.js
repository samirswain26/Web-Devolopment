import Router from "express";
import {
  createnotes,
  createTaskNotes,
  getProjectNotes,
  getTasktNotes,
} from "../controllers/note.controllers.js";

import { isLoggedIn } from "../middleware/validator.middleware.js";

const router = Router();

router.route("/create-notes").post(isLoggedIn, createnotes);
router.route("/get-notes").post(isLoggedIn, getProjectNotes);
router.route("/cretae-task-notes").post(isLoggedIn, createTaskNotes);
router.route("/get-task-notes").post(isLoggedIn, getTasktNotes);

export default router;
