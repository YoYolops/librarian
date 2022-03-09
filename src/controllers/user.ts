import { Request, Response, NextFunction } from "express";
import UserService from "../services/User";
import UserEntity from "../entities/User";
import Encrypter from "../services/adapters/BcryptAdapter";
import JWTAdapter from "../services/adapters/JWTAdapter";

const encrypter = new Encrypter(10);
const jwtAdapter = new JWTAdapter(process.env.JWT_SECRET);
const userService = new UserService(UserEntity, encrypter, jwtAdapter);

async function registerUser(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
        const registeredUser = await userService.register(body);
        return res.status(201).send(registeredUser);
    } catch(error) { return next(error); }
}

async function loginUser(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
        const loggedUserToken = await userService.login(body);
        console.log(loggedUserToken);
        return res.status(200).send(loggedUserToken);
    } catch(error) { return next(error); }
}

export default {
    registerUser,
    loginUser
}