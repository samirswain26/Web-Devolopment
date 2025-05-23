import {User} from "../models/user.models.js"
import {asyncHandler} from "../utils/async-handler.js"
import {sendMail, emailVerificationMailContent, forgotPasswordMailGenContent } from "../utils/mail.js"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { error } from "console"
import { fail } from "assert"


const registerUser = asyncHandler(async (req ,res)=>{
    const {username,email, password, role, fullname} = req.body

    // Validation

    if( !username || !email || !password || !role || !fullname ){
      return res.status(404).json({
        message: "All fields are required"
      })
    }
    console.log(email)
    

    try {
      const existingUser = await User.findOne({email})
      if(existingUser){
        return res.status(400).json({
          message: "User already exists."
        })
      }


      const user = await User.create({
        username,
        email,
        password,
        role,
        fullname
      })
      console.log(user)

      if(!user){
          return res.status(400).json({
              message: "User Not Registered"
          })
      }


      // Verification Token

      const token = user.generateTemporaryToken()
      console.log(token)
      const hashedToken = token.hashedToken
      user.emailVerificationToken = hashedToken
      console.log(hashedToken)
      const TokenExpiry = token.TokenExpiry
      user.emailVerificationExpiry = TokenExpiry

      
      
      
      
      // Send Mail 
      
      const jwttoken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30m"});
      const verificationUrl = `${process.env.BASE_URL}/api/v1/verify/${token.unHashedToken}`
      await sendMail({
        subject:" Verify Your Account",
        email: user.email,
        username: username,
        mailGenContent: emailVerificationMailContent(username, verificationUrl)
      })
      
      
      
      // Add a success response
      res.status(201).json({
        message: "User registered successfully",
        success: true,
        userId: user._id
      });
      await user.save()
      
    }catch (error) {
    console.error("Registration error:", error); 
    return res.status(400).json({ 
      message: "User not registered",
      error: error.message, 
      success: false,
    });
  }
});



const verifyEmail = asyncHandler(async (req, res) => {

  const { token } = req.params;
  // convert the token to hash get by param 
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
  console.log(hashedToken);
    if(!token){
        return res.status(400).json({
            message: "Invalid token"
        })
    }
    const user = await User.findOne({emailVerificationToken: hashedToken})
    if(!user){
        return res.status(400).json({
            message: "Invalid token"
        })
    }

    user.isEmailVerified = true
    user.emailVerificationToken = undefined
    user.emailVerificationExpiry = undefined
    await user.save()
    
    console.log("User verified successfully...")
    res.status(201).json({
      message: "User verified successfully...",
      success: true
    })
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  if(!email && !password){
    return res.status(400).json({
      message: "Please Enter Email and Password"
    })
  }

  try {
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({
        message: "User not found"
      })
    }
    const ismatched = await  user.isPasswordCorrect(password)
    console.log(ismatched)

    if(!ismatched){
      console.log("Password did not match")
      return res.status(400).json({
        message: "Invalid email or password",
        error : error.message,
        success: false
      })
    }

    const jwtAccessToken =  await user.generateAccessToken(user)

    const cookieOption = {
      httpOnly: true,
      secure: true,
      maxAge : 20*60*60*1000
    }
    res.cookie("jwtAccessToken", jwtAccessToken, cookieOption)

    res.status(200).json({
      message: "Login Successful",
      jwtAccessToken,
      user:{
        id: user._id,
        username: user.username,

      }
    })

    console.log("Login Successful")
  } catch (error) {
    res.status(400).json({
      message: "User Login Failed",
      error: error.message,
      success: false
    })
  }
});

const getMe = async (req, res) => {
    try {
        let data = req.user
        console.log(`Reached at Profile level.`, data)
        const user = await User.findById(req.user._id).select("-password")
        if(!user){
          console.log("user not found...")
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

       return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        
    }
}

const logoutUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});


const resendEmailVerification = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});
const resetForgottenPassword = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

export {
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgottenPassword,
  verifyEmail,
  getMe
};


