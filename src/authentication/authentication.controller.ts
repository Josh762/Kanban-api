import express from 'express';

class AuthenticationController {
    public path = '/auth';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post(`${this.path}/register`, this.register);
        this.router.post(`${this.path}/login`, this.login);
    }

    register = (request: express.Request, response: express.Response) => {
        response.send("HHHNNNNGGG")
    }

    login = (request: express.Request, response: express.Response) => {
    }


}

export default AuthenticationController;
