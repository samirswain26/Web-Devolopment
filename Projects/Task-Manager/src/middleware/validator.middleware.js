import {validationResult} from "express-validator"
import {ApiError} from "../utils/api-error.js"
import jwt from "jsonwebtoken";

export const validator = (req, res, next) => {
    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next();
    }

    const extractError = [];
    errors.array().map((err) => 
        extractError.push({
            [err.path]: err.msg,
        }),
    )

    throw new ApiError(422, "Received data is not valid",extractError)
}






export const isLoggedIn = async (req, res, next) => {
  try {
    console.log(req.cookies);
    let token = req.cookies.jwtAccessToken;
    console.log(token)

    console.log("Token Found: ", token ? "YES" : "NO");

    if (!token) {
      console.log("NO token");
      return res.status(401).json({
        success: false,
        message: "Authentication failed",
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("decoded data: ", decoded);
    req.user = decoded;
    next();
    
  } catch (error) {
    console.log("Auth middleware failure");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};