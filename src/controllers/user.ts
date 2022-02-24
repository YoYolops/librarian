import { Request, Response, NextFunction } from "express";
import UserRegistrationData from "../protocols/"

async function authenticateUser(req: Request, res: Response, next: NextFunction) {
    try {

    } catch(error) {
        return next(error);
    }
}

export default {
    authenticateUser
}