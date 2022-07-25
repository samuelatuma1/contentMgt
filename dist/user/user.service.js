"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allUsers = exports.loginUser = exports.signToken = exports.createUser = void 0;
const user_model_1 = require("./user.model");
const crypto = __importStar(require("crypto"));
const jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv/config");
var processEnv = process.env;
async function createUser(req) {
    try {
        const formBody = req.body;
        // Hash Password
        const hashedPassword = crypto.createHmac('sha256', processEnv.SECRET_KEY).update(formBody.password).digest("hex");
        const newUser = await new user_model_1.User({ email: formBody.email, password: hashedPassword });
        return await newUser.save();
    }
    catch (err) {
        console.log(err);
        throw new Error("An error occured. Perhaps User already exists");
    }
}
exports.createUser = createUser;
function signToken(user_uuid) {
    const token = (0, jsonwebtoken_1.sign)({ user_uuid }, processEnv.SECRET_KEY, { expiresIn: '1d' });
    return token;
}
exports.signToken = signToken;
async function loginUser(req) {
    try {
        const formBody = req.body;
        // Hash Password
        const hashedPassword = crypto.createHmac('sha256', processEnv.SECRET_KEY).update(formBody.password).digest("hex");
        const user = await user_model_1.User.findOne({ email: formBody.email, password: hashedPassword });
        if (!user) {
            throw new Error("An error occured");
        }
        const { email, password, _id } = user.toObject();
        // Sign user token
        const token = signToken(_id);
        return { email, token };
    }
    catch (err) {
        console.log(err);
        throw new Error("An error occured");
    }
}
exports.loginUser = loginUser;
async function allUsers() {
    try {
        return await user_model_1.User.find();
    }
    catch (err) {
        throw new Error("An error occured");
    }
}
exports.allUsers = allUsers;
