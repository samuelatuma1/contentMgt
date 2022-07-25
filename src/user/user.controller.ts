import {Request, Response} from "express";
import {validationResult} from "express-validator"

import {createUser, loginUser, allUsers} from "./user.service";

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
        // Remove loggedout cookie
        res.clearCookie("loggedout")
        return res.json(user)
    } catch(err){
        console.log(err)
        return res.status(400).json({"error": "Username or Password invalid"})
    }
}

/**
 * @method GET /api/v1/user/logout
 * @ACCESS PRIVATE
 * @desc logs out a signed in user, invalidates token
 */
async function logout(req: Request, res: Response){
    try{
        // Add logout to res.cookie
        res.cookie("loggedout", true)
        return res.sendStatus(204)
    } catch(err){
        res.sendStatus(400)
    }
}

/**
 * @method GET /api/v1/user/users
 * @ACCESS PUBLIC
 * @desc returns a list of all users
 */
async function allusers(req: Request< {}, {}, {}, {}>, res: Response){
    try{
        const users = await allUsers()
        return res.json({users})
    } catch(err){
        console.log(err)
        return res.sendStatus(400)
    }
}

async function changepassword(req: Request, res: Response){
    try{
        const errors: any = validationResult(req).array();
        if(errors.length > 0){
            return res.json({"errors": errors})
        }
    } catch(err){
        return res.sendStatus(400)
    }
}
export {adduser, login, allusers, logout}