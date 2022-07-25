import {body, ValidationChain } from "express-validator"
import {Request, Response, NextFunction} from "express";
import {validateToken} from "../post/post.middleware";

const verifyUserDetails: ValidationChain[] = [
    body("email").isEmail(),
    body("password").isLength({min: 1})
]

const verifyUpdatePassword: ValidationChain[] = [
    body("oldPassword").isLength({min: 1}),
    body("newPassword").isLength({min: 1})
]




export {verifyUserDetails, verifyUpdatePassword, validateToken};