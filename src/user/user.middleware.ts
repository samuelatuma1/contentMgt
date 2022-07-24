import {body, ValidationChain } from "express-validator"
import {Request, Response, NextFunction} from "express";


const verifyUserDetails: ValidationChain[] = [
    body("email").isEmail(),
    body("password").isLength({min: 1})
]


export {verifyUserDetails};