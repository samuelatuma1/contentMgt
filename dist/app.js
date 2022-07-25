"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
// import routes
const user_urls_1 = __importDefault(require("./user/user.urls"));
const post_urls_1 = __importDefault(require("./post/post.urls"));
require("dotenv/config");
const config_1 = __importDefault(require("./config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Configure
(0, config_1.default)();
const app = (0, express_1.default)();
// Set up helmet
app.use((0, helmet_1.default)());
// Set up cookie
app.use((0, cookie_parser_1.default)());
// handle post data
app.use(express_1.default.json());
// Add routes
app.use("/api/v1/user", user_urls_1.default);
app.use("/api/v1/posts", post_urls_1.default);
const port = process.env.PORT;
app.listen(port, () => console.log("Listening on Port", port));
