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

        // const isverified = user.isVerified()
        
        if(!isMatch){
            return res.status(400).json({
                message: "invalid email and password", 
            });
        }
        
        if(user.isVerified === true){
            // verify the email as isVerifed fireld....
    
            const token = jwt.sign({id: user._id, role: user.role},
                process.env.JWT_SECRET, {
                    expiresIn: "24h"
                }
            );
    
            const cookieOption = {
                httpOnly: true,
                secure: true,
                maxAge: 24*60*60*1000
            }
            res.cookie("token", token, cookieOption)
    
            res.status(200).json({
                message: "Login Successful",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    role: user.role
                }
            })
        }else{
            return res.status(500).json({
                mesasage : "Email is not verified"
            })
        }


    } catch (error) {
        return error
    }
}

const getMe = async (req, res) => {
    try {
        let data = req.user
        console.log(`Reached at Profile level.`, data)
        const user = await User.findById(req.user.id).select(-password)
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        
    }
}


const logoutUser = async (req, res) => {
    try {
        res.cookie('token', '', {})
        // expires: new date(0)
        res.status(200).json({
            success: true,
            message: "Logged Out Sucessfully"
        })
    } catch (error) {
        
    }
}

const forgotPassword = async (req, res) => {
    try {
    //get email
    // find user based on email
    // reset token + reset expiry => Date.now() + 10 * 60 * 1000 => user.save()
    // send mail => design url

    const {email} = req.body
    console.log(email)
    if(!email){
        return res.status(400).json({
            message: "Please Enter Email"
        })
    }
    const user = await User.findOne({email: email})
    console.log(user);
    

    const token = crypto.randomBytes(32).toString("hex")
    console.log(token)
    user.resetPasswordToken = token

    const resetExpires = Date.now() + 60 * 60 * 1000
    user.resetPasswordExpiries = resetExpires
    console.log(resetExpires)

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
            subject: "Forgot Password", // Subject line
            text: `Please click on the following link:
            ${process.env.BASE_URL}/api/v1/users/reset/${token}`
      }

    await transporter.sendMail(mailOption) 

    res.status(201).json({
        message: "Message Sent to your email",
        success: true
    })

    } catch (error) {
        res.status(404).json({
            message: "Please Enter A Valid Email"
        })
    }
}


const resetPassword = async (req, res) => {
    try {
    //collect token from params
    // password from req.body
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
 
    if(password === confirmPassword){
        console.log("Password Matched")

        const confPassword  = password

        try {
            const user = await User.findOne({
            resetPasswordToken : token,
            resetPasswordExpiries :  {$gt: Date.now()}
           
        })
        if(!user){res.status(404).json({message: "Token not found"})}

        user.password = confPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiries = undefined;
        await user.save()
        console.log("Kaam Hogaya")
        
        res.status(200).json({
            message: "Password changed successfully!"
        })
       
    } catch (error) {
        res.status(404).json({
            message: "Code Faat gaya"
        })   
    }


    }else{
        res.status(404).json({
            message: "Password and confirm password are not equal",
            success: false,
        })}

} catch (error) {
        res.status(400).json({
            message: "Password and confirm password are not equal"
        })
    }
}


export {registeruser, verifyUser, login, getMe, logoutUser, forgotPassword, resetPassword}