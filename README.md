# Content Management API
- This API allows users Create, Retrieve, Update and Delete Posts
- Built with Node.js and TypeScript

## Dependencies
    - "dependencies": {
        "cookie-parser": "^1.4.6",
        "express": "^4.18.1",
        "express-validator": "^6.14.2",
        "helmet": "^5.1.1",
        "jsonwebtoken": "^8.5.1",
        "mongoose": "^6.4.6"
    },
    - "devDependencies": {
        "@types/cookie-parser": "^1.4.3",
        "@types/express": "^4.17.13",
        "@types/jsonwebtoken": "^8.5.8",
        "@types/node": "^18.0.6",
        "chai": "^4.3.6",
        "dotenv": "^16.0.1",
        "mocha": "^10.0.0",
        "nodemon": "^2.0.19",
        "ts-node": "^10.9.1",
        "typescript": "^4.7.4"
    }

## Environment Variables
### Example
    mongoDBURI = "mongodb+srv://<username>:<password>@cluster0.k7wdg.mongodb.net/?retryWrites=true&w=majority"
    SECRET_KEY = "Some string"

## API Documentation

### Route /api/v1/user

    @route /signup
        * @method POST /api/v1/user/signup
        * @ACCESS PUBLIC
        * @desc signs up a user, stores email and hashedPassword in DataBase
        * @payload {email : string, password: string}
        * @returns UserObject{
                "email": string,
                "password": string,
                "_id": mongoose.ObjectId
            } OR status(400)

    @route /login
        * @method POST /api/v1/user/login
        * @ACCESS PUBLIC
        * @desc signs in a user with the right email and password returns token
        * @payload {email : string, password : string}
        * @returns {
                email: string,
                token: JwtToken
            } OR Status(400) Response
    
    @route /logout
        * @method GET /api/v1/user/logout
        * @HEADERS: {... , "Authorization": "Bearer <Authorization Token>"}
        * @ACCESS PRIVATE 
        * @desc logs out a signed in user, invalidates token

    @route /users
        * @method GET /api/v1/user/users
        * @ACCESS PUBLIC
        * @desc returns all users
        @returns {
            "users": {
                        "_id": mongoose.ObjectId,
                        "email": string,
                        "__v": 0
                    }[]
            }


### Route /api/v1/posts
    @route /
    * @method GET /api/v1/posts/
    * @HEADERS: {... , "Authorization": "Bearer <Authorization Token>"}
    * @ACCESS PRIVATE Requires Login
    * @desc returns all posts posted by this user
    * @returns {
            userposts: {
                "_id": mongoose.ObjectId,
                "post": string,
                "user": mongoose.ObjectId,
                "createdAt": DateTime,
                "updatedAt": DateTime
            }[]
        }
    
    @route /
        * @method GET /api/v1/posts/
        * @HEADERS: {... , "Authorization": "Bearer <Authorization Token>"}
        * @ACCESS PRIVATE Requires Login
        *@desc Adds post to user's post
        @payload {
            "post": string
        }
        *@returns {
            "post": string
            "user": mongoose.ObjectId,
            "_id": mongoose.ObjectId,
            "createdAt": DateTime,
            "updatedAt": DateTime,
            }


    @route /<postId: mongoose.ObjectId>
        * @method GET /api/v1/posts/:postId
        * @HEADERS: {... , "Authorization": "Bearer <Authorization Token>"}
        * @ACCESS PRIVATE Requires Login
        *@desc Returns Post with postId matching :postId for authorized usr
        @returns {
            "post": string
            "user": mongoose.ObjectId,
            "_id": mongoose.ObjectId,
            "createdAt": DateTime,
            "updatedAt": DateTime,
            } OR null

    @route /<postId: mongoose.ObjectId>
        * @method PUT  /api/v1/posts/:postId
        * @HEADERS: {... , "Authorization": "Bearer <Authorization Token>"}
        * @ACCESS PRIVATE Requires Login
        *@desc Updates post with postId only if userId matches the creator of the post
        @returns statusCode(204) OR statusCode(400)

    

     @route /<postId: mongoose.ObjectId>
        * @method DELETE  /api/v1/posts/:postId
        * @HEADERS: {... , "Authorization": "Bearer <Authorization Token>"}
        * @ACCESS PRIVATE Requires Login
        *@desc Deletes post with postId only if userId matches the creator of the post
        @returns statusCode(204) OR statusCode(400)

