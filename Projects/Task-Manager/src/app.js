import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"

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
import notesroueter from "./routes/notes.routes.js"


app.use("/api/v1", healthcheckrouter)
app.use("/api/v1", authrouter)
app.use("/api/v1", projectrouter)
app.use("/api/v1", taskrouter)
app.use("/api/v1", notesroueter)


// Checking the file is actually visinle in the client side or not
app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"))
app.get("/api/v1/homepage", (req,res) => {
    return res.render("homepage")
})
app.get("/api/v1/samir", (req,res) => {
    return res.send("samir")
})


export default app;