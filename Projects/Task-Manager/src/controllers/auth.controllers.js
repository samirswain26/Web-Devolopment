import {User} from "../models/user.models.js"
import {asyncHandler} from "../utils/async-handler.js"
import {userRegistrationValidator} from "../validators/index.js"
import nodemailer from "nodemailer"

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




      const token = user.generateTemporaryToken()
      console.log(token)
      const hashedToken = token.hashedToken
      user.emailVerificationToken = hashedToken
      console.log(hashedToken)
      const TokenExpiry = token.TokenExpiry
      user.emailVerificationExpiry = TokenExpiry

      
      await user.save()



      // Send Mail 
      const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_SMTP_HOST,
            port: process.env.MAILTRAP_SMTP_PORT,
            secure: false, 
            auth: {
              user: process.env.MAILTRAP_SMTP_USER,
              pass: process.env.MAILTRAP_SMTP_PASS,
            },
          });

          const mailOption = {
                from: process.env.MAILTRAP_SENDEREMAIL,
                to: user.email,  
                subject: "Verify Your Email", // Subject line
                text: `Please click on the following link:
                ${process.env.BASE_URL}/api/v1/verify/${token.unHashedToken}`
          }

        await transporter.sendMail(mailOption)


      
      // Add a success response
      return res.status(201).json({
        message: "User registered successfully",
        success: true,
        userId: user._id
      });

    }catch (error) {
    console.error("Registration error:", error); 
    return res.status(400).json({ 
      message: "User not registered",
      error: error.message, 
      success: false,
    });
  }
});



const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const logoutUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const verifyEmail = asyncHandler(async (req, res) => {
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
};


