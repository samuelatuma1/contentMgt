import {Request, Response, NextFunction} from "express";
import {verify, JwtPayload} from "jsonwebtoken";
import {body, ValidationChain } from "express-validator"

const validatePostFormData: ValidationChain[] = [
    body("post").trim().isLength({min: 1})
]

var processEnv: any = process.env

async function validateJWTToken(token: string){
    try{
        const tokenData = await verify(token, processEnv.SECRET_KEY)
        return tokenData
    } catch(err){
        return null
    }
}

async function validateToken(req: Request, res: Response, next: NextFunction){
    try{
        if(req.cookies.loggedout){
            return res.status(400).json({"error": "User logged out"})
        }
        const bearer: string | undefined = req.headers.authorization
        if(!bearer){
            return res.status(403).json({"error": "Error, no token"})
        }
        const token = bearer.split(" ")[1]
        const jwtToken: string | JwtPayload | null = await validateJWTToken(token)

        if(!jwtToken){
            throw new Error("Token not valid")

        }
        if(typeof jwtToken !== "string"){
            const userId = jwtToken.user_uuid
            
            // attach userId to res object
            res.locals.userId = userId
            console.log(jwtToken)
            return next()
        }else{
            throw new Error("Token not valid")
        }
        
    } catch(err){
        return res.status(400).json({"error": "Error, no token"})
    }
}

export {validatePostFormData, validateToken}