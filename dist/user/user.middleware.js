"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.verifyUpdatePassword = exports.verifyUserDetails = void 0;
const express_validator_1 = require("express-validator");
const post_middleware_1 = require("../post/post.middleware");
Object.defineProperty(exports, "validateToken", { enumerable: true, get: function () { return post_middleware_1.validateToken; } });
const verifyUserDetails = [
    (0, express_validator_1.body)("email").isEmail(),
    (0, express_validator_1.body)("password").isLength({ min: 1 })
];
exports.verifyUserDetails = verifyUserDetails;
const verifyUpdatePassword = [
    (0, express_validator_1.body)("oldPassword").isLength({ min: 1 }),
    (0, express_validator_1.body)("newPassword").isLength({ min: 1 })
];
exports.verifyUpdatePassword = verifyUpdatePassword;
