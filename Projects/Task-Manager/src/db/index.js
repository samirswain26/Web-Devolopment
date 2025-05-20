import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const mongoURI = process.env.MONGO_URL
const connectDB = async ()=>{
    try {
        await mongoose.connect(mongoURI)
        console.log(`Mongodb Connected`)
    } catch (error) {
        console.error(`Mongodb connection failed`, error)
        process.exit(1)
    }
}

export default connectDB;