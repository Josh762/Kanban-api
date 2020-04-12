import _BaseController from './_BaseController';
import UserService from "./../services/UserService";

const userService = new UserService();

class UserController extends _BaseController {

    constructor(service) {
        super(service);
        this.login = this.login.bind(this);
    }

    async login (req, res) {
        const loginThing = await res.json(userService.login(req.body));
        console.log(loginThing.res);
        return loginThing;
    }

}

export default new UserController(userService);