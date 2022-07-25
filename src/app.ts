// Imports
import express, {Application} from "express";
import helmet from "helmet";

// import routes
import userRoute from "./user/user.urls"
import postRoute from "./post/post.urls"

import "dotenv/config";
import run from './config';

import cookieParser from "cookie-parser";


// Configure
run()
const app: Application = express()

// Set up helmet
app.use(helmet())

// Set up cookie
app.use(cookieParser())


// handle post data
app.use(express.json())

// Add routes
app.use("/api/v1/user", userRoute)
app.use("/api/v1/posts", postRoute)

const port = process.env.PORT
app.listen(port, () => console.log("Listening on Port", port))