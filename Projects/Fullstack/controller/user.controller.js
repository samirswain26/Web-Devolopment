import User from "../model/User.model.js"
import crypto from "crypto"
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const registeruser = async (req,res) => {
    // get data 
    // validate
    // check if the user is already exists
    // create a user in the databse
    // create a verificatio token 
    // send token to the database
    // send token as email to user
    // send success status to user
    
    const{name, email, password} = req.body
    if(!name || !email || !password){
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    console.log(email)

    try {
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const user = await User.create({
            name,
            email,
            password
        })
        console.log(user)

        if(!user){
            return res.status(400).json({
                message: "User not registered"
            })
        }

        const token = crypto.randomBytes(32).toString("hex")
        console.log(token)
        user.verificationToken = token
        
        await user.save()

        // send email
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, 
            auth: {
              user: process.env.MAILTRAP_USERNAME,
              pass: process.env.MAILTRAP_PASSWORD,
            },
          });

          const mailOption = {
                from: process.env.MAILTRAP_SENDEREMAIL,
                to: user.email,  
                subject: "Verify Your Email", // Subject line
                text: `Please click on the following link:
                ${process.env.BASE_URL}/api/v1/users/verify/${token}`
          }

        await transporter.sendMail(mailOption) 
        
        res.status(201).json({
            message: "User registered successfully",
            success: true
        })


    } catch (error) {
        res.status(400).json({
            message: "User not registered ",
            error,
            success: false,
        })
    }
};

const verifyUser = async (req, res) => {
    // get token from url
    // validate
    // find user based on the token
    // if not
    // set isverified foed to true
    // remove verification token
    // save
    // return response

    const {token} = req.params
    console.log(token);
    if(!token){
        return res.status(400).json({
            message: "Invalid token"
        })
    }
    const user = await User.findOne({verificationToken: token})
    if(!user){
        return res.status(400).json({
            message: "Invalid token"
        })
    }

    user.isVerified = true
    user.verificationToken = undefined
    await user.save()

}

const login = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({
            message: "All fields are required" 
        })
    }

    try {
        const user = await User.findOne({email})
        if (!user){
            return res.status(400).json({
                message: "invalid email and password", 
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch)

        if(!isMatch){
            return res.status(400).json({
                message: "invalid email and password", 
            });
        }


        // verify the email as isVerifed fireld....

        const token = jwt.sign({id: user._id, reole: user.role},
            "shhhhh", {
                expiresIn: "24h"
            }
        );

        const cookieOption = {
            httpOnly: true,
            secure: true,
            maxAge: 24*60*60*1000
        }
        res.cookie("test", token, cookieOption)

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user._name,
                role: user._role
            }
        })

    } catch (error) {
        
    }
}

export {registeruser, verifyUser, login}