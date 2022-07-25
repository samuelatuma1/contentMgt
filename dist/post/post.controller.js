"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getpost = exports.deletepost = exports.updatepost = exports.getposts = exports.addpost = void 0;
const express_validator_1 = require("express-validator");
const post_service_1 = require("./post.service");
/**
 *
 */
async function addpost(req, res) {
    try {
        const errors = (0, express_validator_1.validationResult)(req).array();
        if (errors.length > 0) {
            return res.json({ "errors": errors });
        }
        const post = await (0, post_service_1.addPost)(req, res);
        return res.json(post);
    }
    catch (err) {
        return res.sendStatus(400);
    }
}
exports.addpost = addpost;
async function getposts(req, res) {
    try {
        const userPosts = await (0, post_service_1.getPosts)(res);
        return res.json({ userPosts });
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}
exports.getposts = getposts;
async function updatepost(req, res) {
    try {
        const update = await (0, post_service_1.updatePost)(req, res);
        return res.sendStatus(204);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}
exports.updatepost = updatepost;
async function deletepost(req, res) {
    try {
        await (0, post_service_1.deletePost)(req, res);
        return res.sendStatus(204);
    }
    catch (err) {
        return res.sendStatus(400);
    }
}
exports.deletepost = deletepost;
async function getpost(req, res) {
    try {
        const post = await (0, post_service_1.getPost)(req, res);
        return res.status(200).json(post);
    }
    catch (err) {
        return res.sendStatus(400);
    }
}
exports.getpost = getpost;
