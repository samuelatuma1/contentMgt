"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./user.controller");
const user_middleware_1 = require("./user.middleware");
const express_1 = require("express");
const userRoute = (0, express_1.Router)();
userRoute.route("/signup")
    .post(user_middleware_1.verifyUserDetails, user_controller_1.adduser);
userRoute.route("/login")
    .post(user_middleware_1.verifyUserDetails, user_controller_1.login);
userRoute.route("/logout")
    .get(user_middleware_1.validateToken, user_controller_1.logout);
userRoute.route("/users")
    .get(user_controller_1.allusers);
exports.default = userRoute;
