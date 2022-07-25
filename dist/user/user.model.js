"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
// User Model
const UserSchema = new mongoose_1.Schema({
    email: {
        unique: true,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
const User = (0, mongoose_1.model)('User', UserSchema);
exports.User = User;
