import {Request, Response, NextFunction} from "express";
import {User} from "../user/user.model";
import {Post} from "./post.model"

async function addPost(req: Request, res: Response){
    try{
        const userId = res.locals.userId
        const userData = await User.findById(userId)
        if(userData){
            // add post data to 
            const formData = req.body
            const newPost = await new Post({post: formData.post, user: userId})
            const savePost = await newPost.save()
            return savePost

        } else{
            throw new Error("An error occured")
        }
    } catch(err){
        console.log(err)
        throw new Error("An error occured with the user")
    }
}

async function getPosts(res: Response){
    try{
        // Get all posts related to user
        const userId = res.locals.userId
        const userPosts = await Post.find({user: userId})
        return userPosts
    } catch(err){
        console.log("#####################################")
        console.log(err)
        console.log("#####################################")

        throw new Error("An error occured fetching user posts")
    }

}

async function updatePost(req: Request, res: Response){
    try{
        const userId = res.locals.userId
        const update = await Post.findOneAndUpdate({_id: req.params.postId, user: userId}, req.body)
        console.log("update =>", update)
        return update
    } catch(err){
        console.log(err)
        throw new Error("Update error")
    }
}
async function deletePost(req: Request, res: Response){
    try{
        const userId = res.locals.userId
        await Post.findOneAndDelete({_id: req.params.postId, user: userId})

    } catch(err){
        console.log(err)
        throw new Error("Delete Error")
    }
}

async function getPost(req: Request, res: Response){
    try{
        const userId = res.locals.userId
        return await Post.findOne({_id: req.params.postId, user: userId})

    } catch(err){
        console.log(err)
        throw new Error("Retrieve Error")
    }
}
export {addPost, getPosts, updatePost, deletePost, getPost}