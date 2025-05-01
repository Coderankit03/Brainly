import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";


export const userMiddleware = (req: Request,res: Response,next: NextFunction) => {
    const header = req.headers["authorization"];

    if(!header){
        res.status(403).json({message:"authorization token missing"})
        return
    }
    const decoded = jwt.verify(header,JWT_SECRET) as {id:string}

    if(decoded){
        req.userId = decoded.id;
        next()
    }else{
        res.status(403).json({message:"you are not logged in"})
    }
}