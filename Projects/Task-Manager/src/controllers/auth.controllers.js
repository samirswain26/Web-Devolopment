import User from "../../../Authentication/Fullstack/model/User.model.js"
import {asyncHandler} from "../utils/async-handler.js"

const registerUser = asyncHandler(async (req ,res)=>{
    const {email,username, password, role} = req.body

    // Validation
    if(!email || !username || !password || !role){
      return res.starus(404).json({
        message: "All fields are required"
      })
    }
    console.log(email)

    try {
      const existingUser = await User.findOne({email})
      console.log(existingUser)
      if(existingUser){
        return res.ststus(400).json({
          message: "User already exists."
        })
      }


      const user = await User.create({
        username,
        email,
        password,
      })
      console.log(user)

      if(!user){
        return res.ststus(400).json({
          message: "User registration failed!"
        })
      }
    } catch (error) {
      res.status(400).json({
          message: "User not registered ",
          error,
          success: false,
      })
    }

})




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


