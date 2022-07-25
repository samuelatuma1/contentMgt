"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_controller_1 = require("./post.controller");
const post_middleware_1 = require("./post.middleware");
const express_1 = require("express");
const postRoute = (0, express_1.Router)();
postRoute.route("/")
    .post(post_middleware_1.validateToken, post_middleware_1.validatePostFormData, post_controller_1.addpost)
    .get(post_middleware_1.validateToken, post_controller_1.getposts);
postRoute.route("/:postId")
    .get(post_middleware_1.validateToken, post_controller_1.getpost)
    .put(post_middleware_1.validateToken, post_middleware_1.validatePostFormData, post_controller_1.updatepost)
    .delete(post_middleware_1.validateToken, post_controller_1.deletepost);
exports.default = postRoute;
