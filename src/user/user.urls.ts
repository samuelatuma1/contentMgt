import {adduser, login} from "./user.controller";
import {verifyUserDetails} from "./user.middleware"
import {Router} from "express";

const userRoute = Router()

userRoute.route("/signup")
    .post(verifyUserDetails, adduser)

userRoute.route("/login")
    .post(verifyUserDetails, login)

export default userRoute