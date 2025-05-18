import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb Connected`)
    } catch (error) {
        console.error(`Mongodb connection failed`, error)
        process.exit(1)
    }
}

export default connectDB;