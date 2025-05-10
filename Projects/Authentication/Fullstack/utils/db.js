import mongoose  from "mongoose";

import dotenv from "dotenv"
dotenv.config()

const db = function(){
    mongoose
        .connect(process.env.MONGO_URL)
        .then(()=>{console.log("Connected To MongoDB")})
        .catch((err)=>{console.log("Error Connetd to Mongodb")})
}

export default db  