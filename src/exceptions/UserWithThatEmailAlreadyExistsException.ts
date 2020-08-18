import BaseHttpException from "./BaseHttpException";


class UserWithThatEmailAlreadyExistsException extends BaseHttpException {

    constructor(email:string) {
        const status = 409;
        const message = `Email ${email} is already in use.`


        super(status, message);
        // this.action = `Attempted to create user with email ${email}`;
        // this.consequence = `Failed to create user`;
        // this.reason = `Username ${email} is already in use`;
        // this.code = 409;
        //
        // this.message = `${this.consequence}`;
        // // todo may be overcomplicating this? Want to use this for the log maybe
        // // todo should probably have a log class that takes an exception
    }
}


export default UserWithThatEmailAlreadyExistsException;
