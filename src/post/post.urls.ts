import {addpost} from "./post.controller";
import {validateToken} from "./post.middleware"
import {Router} from "express";

const postRoute = Router()

postRoute.route("/createpost")
    .post(validateToken, addpost)


export default postRoute