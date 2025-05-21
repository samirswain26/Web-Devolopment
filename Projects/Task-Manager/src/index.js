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




    

// // Start server only after db connection
// const startServer = async () => {
//   try {
//     // Connect to the database first
//     await connectDB();
    
//     // Start the server after successful database connection
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error(`Failed to start server: ${error.message}`);
//     process.exit(1);
//   }
// };

// startServer();