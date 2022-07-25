"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.allusers = exports.login = exports.adduser = void 0;
const express_validator_1 = require("express-validator");
const user_service_1 = require("./user.service");
/**
 * @method POST /api/v1/user/signup
 * @ACCESS PUBLIC
 * @desc signs up a user
 */
async function adduser(req, res) {
    try {
        const errors = (0, express_validator_1.validationResult)(req).array();
        if (errors.length > 0) {
            return res.status(400).json({ "errors": errors });
        }
        const user = await (0, user_service_1.createUser)(req);
        return res.json(user);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}
exports.adduser = adduser;
/**
 * @method POST /api/v1/user/login
 * @ACCESS PUBLIC
 * @desc signs in a user
 */
async function login(req, res) {
    try {
        const errors = (0, express_validator_1.validationResult)(req).array();
        if (errors.length > 0) {
            return res.json({ "errors": errors });
        }
        const user = await (0, user_service_1.loginUser)(req);
        // Remove loggedout cookie
        res.clearCookie("loggedout");
        return res.json(user);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ "error": "Username or Password invalid" });
    }
}
exports.login = login;
async function logout(req, res) {
    try {
        // Add logout to res.cookie
        res.cookie("loggedout", true);
        return res.sendStatus(204);
    }
    catch (err) {
        res.sendStatus(400);
    }
}
exports.logout = logout;
async function allusers(req, res) {
    try {
        const users = await (0, user_service_1.allUsers)();
        return res.json({ users });
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}
exports.allusers = allusers;
async function changepassword(req, res) {
    try {
        const errors = (0, express_validator_1.validationResult)(req).array();
        if (errors.length > 0) {
            return res.json({ "errors": errors });
        }
    }
    catch (err) {
        return res.sendStatus(400);
    }
}
