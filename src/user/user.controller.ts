import {Request, Response} from "express";
import {validationResult} from "express-validator"

import {createUser, loginUser} from "./user.service";

/**
 * @method POST /api/v1/user/signup
 * @ACCESS PUBLIC
 * @desc signs up a user
 */
async function adduser(req: Request< {}, {}, {email : string, password: string}>, res: Response){
    try{
        const errors: any = validationResult(req).array();
        if(errors.length > 0){
            return res.status(400).json({"errors": errors})
        }
        const user = await createUser(req)
        return res.json(user)
    } catch(err){
        console.log(err)
        return res.sendStatus(400)
    }
}

/**
 * @method POST /api/v1/user/login
 * @ACCESS PUBLIC
 * @desc signs in a user
 */
async function login(req: Request< {}, {}, {email : string, password: string}>, res: Response){
    try{
        const errors: any = validationResult(req).array();
        if(errors.length > 0){
            return res.json({"errors": errors})
        }
        const user = await loginUser(req)
        return res.json(user)
    } catch(err){
        console.log(err)
        return res.status(400).json({"error": "Username or Password invalid"})
    }
}

export {adduser, login}