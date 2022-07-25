"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.validatePostFormData = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const express_validator_1 = require("express-validator");
const validatePostFormData = [
    (0, express_validator_1.body)("post").trim().isLength({ min: 1 })
];
exports.validatePostFormData = validatePostFormData;
var processEnv = process.env;
async function validateJWTToken(token) {
    try {
        const tokenData = await (0, jsonwebtoken_1.verify)(token, processEnv.SECRET_KEY);
        return tokenData;
    }
    catch (err) {
        return null;
    }
}
async function validateToken(req, res, next) {
    try {
        if (req.cookies.loggedout) {
            return res.status(400).json({ "error": "User logged out" });
        }
        const bearer = req.headers.authorization;
        if (!bearer) {
            return res.status(403).json({ "error": "Error, no token" });
        }
        const token = bearer.split(" ")[1];
        const jwtToken = await validateJWTToken(token);
        if (!jwtToken) {
            throw new Error("Token not valid");
        }
        if (typeof jwtToken !== "string") {
            const userId = jwtToken.user_uuid;
            // attach userId to res object
            res.locals.userId = userId;
            console.log(jwtToken);
            return next();
        }
        else {
            throw new Error("Token not valid");
        }
    }
    catch (err) {
        return res.status(400).json({ "error": "Error, no token" });
    }
}
exports.validateToken = validateToken;
