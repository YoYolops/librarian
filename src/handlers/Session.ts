import SecurityError from "../errors/SecurityError";
import { Request, Response, NextFunction } from "express";
import JWTAdapter from "../services/adapters/JWTAdapter";
import BaseUserEncodeData from "../services/protocols/BaseUserEncodeData";
import User from "../entities/User";

export default class SessionHandler {

    static extractSessionTokenFromHeaders(headers: any): string {
        const { authorization } = headers;
        const token = authorization.split(" ")[1];
        if(!token) throw new SecurityError("You did not provided any token, therefore are not alowed to acess the resources");
        return token;
    }

    static decodeFoundToken(token: string) {
        const tokenAdapter = new JWTAdapter(process.env.JWT_SECRET);
        if(!tokenAdapter.check(token)) throw new SecurityError("Token provided is not trustful");
        return tokenAdapter.decode(token)
    }

    static async decodedUserDataDoesReallyMatchAny(decodedData: BaseUserEncodeData): Promise<boolean> {
        /* We need to prevent that a non registered user sends a token, having access to the system without really being registred */
        const isUserRegistered = await User.isUserAlreadyRegistered({
            username: decodedData.username,
        })
        return isUserRegistered;
    }

    static async handle(req: Request, res: Response, next: NextFunction) {
        const extractedToken = this.extractSessionTokenFromHeaders(req.headers);
        const decodedDataFromToken = this.decodeFoundToken(extractedToken);

        const doesDataMatchWithAnyRegisteredUser = await this.decodedUserDataDoesReallyMatchAny(decodedDataFromToken);
        if(doesDataMatchWithAnyRegisteredUser) {
            req.addresser = decodedDataFromToken;
            return next();
        }
        throw new SecurityError("The provided credential could not be accepted");
    }

}