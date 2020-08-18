import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import userModel from '../users/user.model';
import CreateUserDTO from '../users/create-user.dto';
import AuthRequestDto from "./auth-request.dto";

import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExists';
import UserWithThatUserNameAlreadyExistsException from '../exceptions/UserWithThatUserNameAlreadyExists';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import validationMiddleware from "../middleware/validation.middleware";
import UserResponseDTO from "../users/user-response-d-t.o";
import AuthResponseDTO from "./auth-response.dto";
import User from "../users/user.interface";

class AuthenticationController {
    public path = '/auth';
    public router = express.Router();
    private user = userModel;


    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDTO), this.register);
        this.router.post(`${this.path}/login`, validationMiddleware(AuthRequestDto), this.login);
    }

    register = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const userData: CreateUserDTO = request.body;
        if ( await this.user.findOne({ email: userData.email }) ) {
            next(new UserWithThatEmailAlreadyExistsException(userData.email));
        }
        else if ( await this.user.findOne({ username: userData.username }) ) {
            next(new UserWithThatUserNameAlreadyExistsException(userData.username));
        }
        else {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user = await this.user.create({
                ...userData,
                password: hashedPassword,
            });
            const tokenData = this.createToken(user);
            response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
            response.send(new UserResponseDTO(user));
        }
    }

    login = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const logInData: AuthRequestDto = request.body;

        const query = logInData.username.includes('@') ? { email: logInData.username } : { username: logInData.username };
        const user = await this.user.findOne(query);

        if (user) {
            const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
            if (isPasswordMatching) {

                const tokenData = this.createToken(user);
                response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);

                response.send({
                     user: new UserResponseDTO(user)
                });
            } else {
                next(new WrongCredentialsException()); // todo do I want separate exceptions for username/password?
            }
        } else {
            next(new WrongCredentialsException());
        }
    }

    private createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }

    private createToken(user: User): TokenData {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken: DataStoredInToken = {
            _id: String(user._id),
        };

        // TODO need a better secret
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, "secret", { expiresIn }),
        };
    }
}

export default AuthenticationController;
