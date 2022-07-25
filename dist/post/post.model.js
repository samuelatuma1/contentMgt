"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    post: {
        type: String,
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    }
}, {
    strict: true,
    timestamps: true
});
const Post = (0, mongoose_1.model)('Post', PostSchema);
exports.Post = Post;
