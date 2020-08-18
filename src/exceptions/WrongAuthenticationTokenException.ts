import BaseHttpException from "./BaseHttpException";


class WrongAuthenticationTokenException extends BaseHttpException {
    constructor() {
        const status = 400;
        const message = `The provided token is not valid.`
        super(status, message);
    }
}

export default WrongAuthenticationTokenException;
