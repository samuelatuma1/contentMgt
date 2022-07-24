import {addpost, getpost, updatepost, deletepost} from "./post.controller";
import {validateToken, validatePostFormData} from "./post.middleware"
import {Router} from "express";

const postRoute = Router()

postRoute.route("/")
    .post(validateToken, validatePostFormData, addpost)
    .get(validateToken, getpost)

postRoute.route("/:postId")
    .put(validateToken, validatePostFormData, updatepost)
    .delete(validateToken, deletepost)

export default postRoute