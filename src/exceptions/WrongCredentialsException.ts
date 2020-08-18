import BaseHttpException from "./BaseHttpException";


class WrongCredentialsException extends BaseHttpException {
    constructor() {
        const status: number = 401;
        const message: string = `The username or password is incorrect.`;
        super(status, message);
    }
}

export default WrongCredentialsException;
