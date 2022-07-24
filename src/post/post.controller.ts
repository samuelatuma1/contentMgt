import {Request, Response} from "express";


/**
 * 
 */
async function addpost(req: Request, res: Response){
    try{
        console.log("locals => ", res.locals)
        return res.json({"msg": "Post a post"})
    } catch(err){
        return res.sendStatus(400)
    }
}

export {addpost}