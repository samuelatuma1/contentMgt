import {addpost, getposts, updatepost, deletepost, getpost} from "./post.controller";
import {validateToken, validatePostFormData} from "./post.middleware"
import {Router} from "express";

const postRoute = Router()

postRoute.route("/")
    .post(validateToken, validatePostFormData, addpost)
    .get(validateToken, getposts)

postRoute.route("/:postId")
    .get(validateToken, getpost)
    .put(validateToken, validatePostFormData, updatepost)
    .delete(validateToken, deletepost)

export default postRoute