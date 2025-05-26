import {User} from "../models/user.models.js"
import {asyncHandler} from "../utils/async-handler.js"
import {sendMail, emailVerificationMailContent, forgotPasswordMailGenContent } from "../utils/mail.js"
import {ApiError} from "../utils/api-error.js"
import {ApiResponse} from "../utils/api-response.js"
import crypto from "crypto"



const generateAccessAndRefreshTokens = async (Id) => {
     try {
        const user = await User.findById(Id)
        const accessToken =  user.generateAccessToken()
        const refreshToken =  user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }

};



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
      
      // const jwttoken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30m"});
      const verificationUrl = `${process.env.BASE_URL}/api/v1/verify/${token.unHashedToken}`
      await sendMail({
        subject:" Verify Your Account",
        email: user.email,
        username: username,
        mailGenContent: emailVerificationMailContent(username, verificationUrl)
      })
      
      
      
      // Add a success response
      res.status(201).json({
        message: "User registered sucessfully",
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
    
    console.log("User verified sucessfully...")
    res.status(201).json({
      message: "User verified sucessfully...",
      success: true
    })
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  
  if(!email && !password){
    throw new ApiError(400, "Email and Password is required")
  }

  try {
    const user = await User.findOne({email})
    if(!user){
      throw new ApiError(400, "user does not exist")
    }
    const ismatched = await  user.isPasswordCorrect(password)
    console.log(ismatched)

    if(!ismatched){
      throw new ApiError(401, "Invalid user credentials")
    }


    const {refreshToken,accessToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password ")
    console.log(loggedInUser)
    console.log(accessToken )
    console.log(refreshToken)


    const cookieOption = {
      httpOnly: true,
      secure: true,
      maxAge : 20*60*60*1000
    }
    const cookieOption2 = {
      httpOnly: true,
      secure: true,
      maxAge : 24 * 24 * 60 * 60 * 1000 // 24 days
    }

    console.log("Login Sucessful")
    return res
    .cookie("accessToken", accessToken, cookieOption)
    .cookie("refreshToken", refreshToken, cookieOption)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser, accessToken, refreshToken,
        },
        "user Logged In Successfully"
      )
    )
  } catch (error) {
    throw new ApiError(401, "User Login failed")
  }
});

const getCurrentUser = async (req, res) => {
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
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // This removes the field from the document
      }
    },
    {
      new:true
    }
  )
  try {
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {userId: req.user}, "User logged Out"))

  } catch (error) {
    res.status(400).json({
      message: "User did not logged In",
      success: false
    })
  }
});


const resendEmailVerification = asyncHandler(async (req, res) => {

});


const resetForgottenPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email)
  if(!email){
    res.status(400).json({
      message: "Please Enter Email"
    })
  }
  
  const user = await User.findOne({email})
  if(!user){
    res.status(400).json({
      message: "There is no user in the database"
    })
  }
  console.log(user)

  const token = user.generateTemporaryToken()
  console.log(token)
  const hashedToken = token.hashedToken
  user.forgotPasswordToken = hashedToken
  console.log(hashedToken)
  const TokenExpiry = token.TokenExpiry
  user.forgotPasswordExpiry = TokenExpiry

  await user.save()

  
  // Send Mail 

  const forgotPasswordUrl = `${process.env.BASE_URL}/api/v1/reset/${token.unHashedToken}`
  await sendMail({
      subject:" Forgot Password",
      email: user.email,
      username: user.username,
      mailGenContent: forgotPasswordMailGenContent(user.username, forgotPasswordUrl)
  })
  res.status(201).json({
      message: "Forgot Password token send to your mail",
      success: true,
      userId: user._id
  });


  

});



const refreshAccessToken = asyncHandler(async(req, res) => {
  const incomingRefreshTokens =  req.cookies.refreshToken || req.body.refreshToken

  if (!incomingRefreshTokens) {
      throw new ApiError(401, "unauthorized request")
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshTokens, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id)
    if(!user){
      throw new ApiError(401, "Invalid refresh Token")
    }

    if(incomingRefreshTokens !== user?.refreshToken){
      throw new ApiError(401, "Refresh token is expired or used")
    }
    const option = {
      httpOnly: true,
      secure: true
    }

    const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)

    return res
    .status(200)
    .cookies("accessToken",accessToken,option)
    .cookies("refreshToken",newRefreshToken,option)
    .json(
      new ApiResponse(
        200, 
        {accessToken, refreshToken: newRefreshToken},
        "Access token refreshed"
      )
    )
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh Token")
  }


})


const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});


const changeCurrentPassword = asyncHandler(async (req, res) => {
  try {
    const {token} = req.params;
    const {password, confPassword} = req.body;

    if(password === confPassword){
      console.log("Password Matched")

      const confPassword = password
    }

    try {
      const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
      console.log(hashedToken);
        const user = await User.findOne({
        forgotPasswordToken : hashedToken,
        forgotPasswordExpiry :  {$gt: Date.now()}
           
        })
        if(!user){res.status(404).json({message: "Token not found"})}

        user.password = confPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        await user.save()
        console.log("Kaam Hogaya")
        
        res.status(200).json({
            message: "Password changed successfully!"
        })
    } catch (error) {
      console.log("Password didn't change due to some internal error")
      res.status(400).json({
        message: "Password didn't change due to some internal error",
        error: error.message,
        success: false
      })
      
    }

  } catch (error) {
    
  }
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


