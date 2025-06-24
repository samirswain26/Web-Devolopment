import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/async-handler.js";

export const validator = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractError = [];
  errors.array().map((err) =>
    extractError.push({
      [err.path]: err.msg,
    }),
  );

  throw new ApiError(422, "Received data is not valid", extractError);
};

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.cookies);
    let token =
      req.cookies?.accessToken ||
      req.cookies?.refreshToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token || typeof token !== "string") {
      throw new ApiError(401, "Token missing or invalid");
    }

    console.log("Token Found:", token ? "YES" : "NO");

    if (!token) {
      console.log("Authentication failed due to no token");
      throw new ApiError(401, "Unauthorized request");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded?._id).select(
      "-password -refreshToken",
    );
    console.log("decoded data: ", decoded);
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = decoded;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
