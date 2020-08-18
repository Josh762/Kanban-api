import { NextFunction, Request, Response } from 'express';
import BaseHttpException from '../exceptions/BaseHttpException';

function postBodyMiddleware(
    error: BaseHttpException,
    request: Request,
    response: Response,
    next: NextFunction) {
    const status = error.status || 400;
    const message = error.message || 'Post method is missing body.';

    response.status(status).send({
        status,
        message,
    });
}


export default postBodyMiddleware;
