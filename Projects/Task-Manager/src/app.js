import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.BASE_URL,
    methods: ["GET", 'POST', "DELETE", 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// router imports
import healthcheckrouter from "./routes/healthcheck.routes.js" 
import authrouter from "./routes/auth.routes.js"
import projectrouter from "./routes/projects.routes.js"
import taskrouter from "./routes/task.routes.js"


app.use("/api/v1", healthcheckrouter)
app.use("/api/v1", authrouter)
app.use("/api/v1", projectrouter)
app.use("/api/v1", taskrouter)



export default app;