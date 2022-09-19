import {Request, Response, NextFunction} from "express";
import {validationResult, ValidationError} from "express-validator";


export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const err = errors.array().map(e => {
            return {
                message: e.msg,
                field: e.param
            }
        })
        res.status(400).json({errorsMessages: err})
    } else {
        next()
    }
}


// {onlyFirstError: true} read this option