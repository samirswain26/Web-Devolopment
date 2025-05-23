import app from "./app.js"
import dotenv from "dotenv"
import connectDB from "./db/index.js"


dotenv.config({
    path: "./.env",
})

const PORT = process.env.PORT || 8000

connectDB()
    .then(()=>{
        app.listen(PORT , ()=>console.log(`App is listening on port: ${PORT}`))
    })
    .catch((err) => {
        console.error(`Mongodb connection error`, err)
        process.exit(1)
        // For seek this catch will never run because in db file "connectdb" already get exit in catch.
    })

