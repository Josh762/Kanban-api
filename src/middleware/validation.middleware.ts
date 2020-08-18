import { plainToClass } from 'class-transformer';
import { validate, ValidationError, Mi } from 'class-validator';
import * as express from 'express';
import BaseHttpException from "../exceptions/BaseHttpException";

function validationMiddleware<T>(type: any, skipMissingProperties = false): express.RequestHandler {
    return (req, res, next) => {
        const data:typeof type = plainToClass(type, req.body)
        if (req.body === undefined) {
            next(new BaseHttpException(400, `Request body cannot be empty.`));
        } else {
            validate(data, {skipMissingProperties})
                .then((errors: ValidationError[]) => {
                    if (errors.length > 0) {
                        console.log(errors)
                        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
                        next(new BaseHttpException(400, message));
                    } else {
                        console.log('NEXT?')
                        next();
                    }
                });
        }
    };
}

export default validationMiddleware;
