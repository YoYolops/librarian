import { NextFunction, Request, Response } from "express";
import NotFoundError from "../errors/NotFoundError";
import TokenError from "../errors/TokenError";
import UserError from "../errors/UserError";


export default class ErrorHandler {
    static isErrorKnown(error: Error): boolean {
        const conditionals = [
            error instanceof NotFoundError,
            error instanceof TokenError,
            error instanceof UserError 
        ]
        
        for(const isKnown of conditionals) { if(isKnown) return true; }
        return false;
    }
    
    static handle(error: any, req: Request, res: Response, next: NextFunction) {
        if(ErrorHandler.isErrorKnown(error)) return res.status(error.statusCode).send(error.message);
        console.log("UNEXPECTED SERVER ERROR");
        console.log(error);
        return res.status(500).send("Sorry, part of our application have been abducted, we're working to get it back")
    }
}
