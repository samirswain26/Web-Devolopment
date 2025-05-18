import express from "express"

const app = express()

// router imports
import healthCheckRouter from "./routes/healthcheck.routes.js"
import { healthCheck } from "./controllers/healthcheck.controllers.js";

app.use("/api/v1/healthcheck", healthCheck)

export default app;