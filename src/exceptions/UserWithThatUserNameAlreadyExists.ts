import BaseHttpException from "./BaseHttpException";


class UserWithThatUserNameAlreadyExistsException extends BaseHttpException {

    constructor(username:string) {
        const status = 409;
        const message = `Username ${username} is already in use.`


        super(status, message);

        // super();
        // this.action = `Attempted to create user with username ${username}`;
        // this.consequence = `Failed to create user`;
        // this.reason = `Username ${username} is already in use`;
        // this.code = 409;
        //
        // this.message = `${this.consequence}`; // todo may be overcomplicating this? Want to use this for the log maybe

    }
}


export default UserWithThatUserNameAlreadyExistsException;
