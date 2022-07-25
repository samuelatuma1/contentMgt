import {adduser, login, logout, allusers} from "./user.controller";
import {verifyUserDetails, validateToken} from "./user.middleware"
import {Router} from "express";

const userRoute = Router()

userRoute.route("/signup")
    .post(verifyUserDetails, adduser)

userRoute.route("/login")
    .post(verifyUserDetails, login)

userRoute.route("/logout")
    .get(validateToken, logout)
userRoute.route("/users")
    .get(allusers)



export default userRoute