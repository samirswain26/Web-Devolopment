import express from "express"

const app = express()
app.use(express.json())

// router imports
import healthCheckRouter from "./routes/healthcheck.routes.js"
import { healthCheck } from "./controllers/healthcheck.controllers.js";
import {registerUser} from "./controllers/auth.controllers.js"
import db from "../../Authentication/Fullstack/utils/db.js";

app.use("/api/v1/healthcheck", healthCheck)
app.use("/api/v1/register", registerUser)

// databse
db()

export default app;