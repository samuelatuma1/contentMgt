"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
require("dotenv/config");
const config_1 = __importDefault(require("./config"));
// Configure
(0, config_1.default)();
const app = (0, express_1.default)();
// Set up helmet
app.use((0, helmet_1.default)());
const port = process.env.PORT;
app.listen(port, () => console.log("Listening on Port", port));
