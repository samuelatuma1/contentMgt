import {User} from "./user.model"
import {Request} from "express";
import * as crypto from "crypto";
import {sign} from "jsonwebtoken";

import { Types } from "mongoose";

import "dotenv/config";
var processEnv: any = process.env


interface IUserForm {
    email: string;
    password: string;
}
async function createUser(req: Request){
    try{
        const formBody:  IUserForm = req.body
        // Hash Password
        const hashedPassword: string = crypto.createHmac('sha256', processEnv.SECRET_KEY).update(formBody.password).digest("hex")


        const newUser = await new User({email: formBody.email, password: hashedPassword})

        return await newUser.save()
    } catch(err){
        console.log(err)
        throw new Error("An error occured. Perhaps User already exists")
    }
}

function signToken(user_uuid: Types.ObjectId): string{
    const token = sign({user_uuid}, processEnv.SECRET_KEY, {expiresIn: '1d'})
    return token
}
async function loginUser(req: Request){
    try{
        const formBody:  IUserForm = req.body
        // Hash Password
        const hashedPassword: string = crypto.createHmac('sha256', processEnv.SECRET_KEY).update(formBody.password).digest("hex")


        const user = await User.findOne({email: formBody.email, password: hashedPassword})
        if(!user){
            throw new Error("An error occured")
        }
        const {email, password, _id} = user.toObject()
        // Sign user token
        const token = signToken(_id)

        return {email, token}
    } catch(err){
        console.log(err)
        throw new Error("An error occured")
    }
}

export {createUser, signToken, loginUser}