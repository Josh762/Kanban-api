import BaseHttpException from "./BaseHttpException";


class AuthenticationTokenMissingException extends BaseHttpException {
    constructor() {
        const status = 400;
        const message = `Authentication token is missing.`
        super(status, message);
    }
}

export default AuthenticationTokenMissingException;
