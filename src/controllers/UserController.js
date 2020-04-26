import _BaseController from './_BaseController';
import UserService from "./../services/UserService";

const userService = new UserService();

class UserController extends _BaseController {

    constructor(service) {
        super(service);
        this.login = this.login.bind(this);
    }

    async login (req, res) {
        await userService.login(req, res);
    }

}

export default new UserController(userService);