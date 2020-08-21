import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import DataStoredInToken from '../api/authentication/interfaces/data-stored-in-token.interface';
import RequestWithUser from '../api/users/interfaces/request-with-user.interface';
import userModel from '../api/users/user.model';

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
    const cookies = request.cookies;
    if (cookies && cookies.Authorization) {
        const secret:string = process.env.JWT_SECRET;
        try {
            // todo need a better secret
            const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
            const id = verificationResponse._id;
            const user = await userModel.findById(id); // todo will this get too expensive to request the user every time?
            if (user) {
                request.user = user;
                next();
            } else {
                next(new WrongAuthenticationTokenException());
            }
        } catch (error) {
            next(new WrongAuthenticationTokenException());
        }
    } else {
        next(new AuthenticationTokenMissingException());
    }
}

export default authMiddleware;
