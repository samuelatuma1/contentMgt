"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPost = exports.deletePost = exports.updatePost = exports.getPosts = exports.addPost = void 0;
const user_model_1 = require("../user/user.model");
const post_model_1 = require("./post.model");
async function addPost(req, res) {
    try {
        const userId = res.locals.userId;
        const userData = await user_model_1.User.findById(userId);
        if (userData) {
            // add post data to 
            const formData = req.body;
            const newPost = await new post_model_1.Post({ post: formData.post, user: userId });
            const savePost = await newPost.save();
            return savePost;
        }
        else {
            throw new Error("An error occured");
        }
    }
    catch (err) {
        console.log(err);
        throw new Error("An error occured with the user");
    }
}
exports.addPost = addPost;
async function getPosts(res) {
    try {
        // Get all posts related to user
        const userId = res.locals.userId;
        const userPosts = await post_model_1.Post.find({ user: userId });
        return userPosts;
    }
    catch (err) {
        console.log("#####################################");
        console.log(err);
        console.log("#####################################");
        throw new Error("An error occured fetching user posts");
    }
}
exports.getPosts = getPosts;
async function updatePost(req, res) {
    try {
        const userId = res.locals.userId;
        const update = await post_model_1.Post.findOneAndUpdate({ _id: req.params.postId, user: userId }, req.body);
        console.log("update =>", update);
        return update;
    }
    catch (err) {
        console.log(err);
        throw new Error("Update error");
    }
}
exports.updatePost = updatePost;
async function deletePost(req, res) {
    try {
        const userId = res.locals.userId;
        await post_model_1.Post.findOneAndDelete({ _id: req.params.postId, user: userId });
    }
    catch (err) {
        console.log(err);
        throw new Error("Delete Error");
    }
}
exports.deletePost = deletePost;
async function getPost(req, res) {
    try {
        const userId = res.locals.userId;
        return await post_model_1.Post.findOne({ _id: req.params.postId, user: userId });
    }
    catch (err) {
        console.log(err);
        throw new Error("Retrieve Error");
    }
}
exports.getPost = getPost;
