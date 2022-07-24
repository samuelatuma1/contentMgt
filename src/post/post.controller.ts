import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {addPost, getPosts, updatePost, deletePost} from "./post.service"
/**
 * 
 */
async function addpost(req: Request, res: Response){
    try{
        const errors: any = validationResult(req).array();
        if(errors.length > 0){
            return res.json({"errors": errors})
        }
        const post = await addPost(req, res)
        return res.json(post)
    } catch(err){
        return res.sendStatus(400)
    }
}

async function getpost(req: Request, res: Response){
    try{
        const userPosts = await getPosts(res)
        return res.json({userPosts})
    } catch(err){
        console.log(err)
        return res.sendStatus(400)
    }
}

async function updatepost(req: Request<{postId: string}, {}, {post: string}, {} >, res: Response){
    try{
        const update = await updatePost(req, res)
        return res.sendStatus(204)
    } catch(err){
        console.log(err)
        return res.sendStatus(400)
    }
}

async function deletepost(req: Request<{postId: string}, {}, {}, {}>, res: Response){
    try{
        await deletePost(req, res)
        return res.sendStatus(204)
    } catch(err){
        return res.sendStatus(400)
    }
}

export {addpost, getpost,  updatepost, deletepost}