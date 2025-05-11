import bcrypt from "bcryptjs"
import crypto from "crypto" 
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"

import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export const registerUser = async(req, res) => {
    const {name,email, password, phone } = req.body

    if(!name || !email || !password || !phone){
        console.log('Data is missing')
        res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    try {
        const existinguser = await prisma.user.findUnique({
            where: {email}
        })
        if(existinguser){
             res.status(400).json({
            success: false,
            message: "User already exists"
        })}

        // hash the password
        const hashedpassword = await bcrypt.hash(password, 10)
        const verificationtoken = crypto.randomBytes(32).toString(hex)

        const user = await prisma.user.create({
            data:{
                name, 
                email,
                phone, 
                password : hashedpassword,
                verificationtoken
            }
        })

        // send mail
    

    } catch (error) {
         res.status(500).json({
            success: false,
            error,
            message: "Registration Failed"
        })
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password ){
         res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    try {
        const user = await prisma.user.findUnique({
            where: {email}
        })
        if(!user){
            res.status(400).json({
            success: false,
            message: "User not found"
        })}

        const isMatch = bcrypt.compare(password, user.password)
        if(!isMatch){
             res.status(400).json({
            success: false,
            message: "Invalid email or password"
        })}

        const jwtToken = jwt.sign(
            {id: user.id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        const cookieOptions = {
            httpOnly: true
        }
        res.cookie("token",jwtToken, cookieOptions )

        return res.status(200).json({
            success: true,
            jwtToken,
            user: {
                id: user.id,
                email: user.email,
                phone: user.phone
            },
            message: 

        })


    } catch (error) {
         res.status(400).json({
            success: false,
            message: "Login Failed"
        })
    }
}