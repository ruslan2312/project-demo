import {Request, Response, NextFunction} from "express";
import {validationResult, ValidationError} from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const errorFormatter = ({location, msg, param, value, nestedErrors}: ValidationError) => {
        return {message: "Any<String>", filed:param };
    };
    const errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
        res.status(400).json({errorsMessages: errors.array()});
    } else {
        next()
    }
}