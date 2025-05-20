import {validationResult} from "express-validator"
import {ApiError} from "../utils/api-error.js"

export const validator = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
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