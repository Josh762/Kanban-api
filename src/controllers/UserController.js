import _BaseController from './_BaseController';
import UserService from "./../services/UserService";

const userService = new UserService();

class UserController extends _BaseController {

    constructor(service) {
        super(service);
        this.login = this.login.bind(this);
    }

    login (req, res, next) {
        try {
            userService.login(req, res, next).then((resp) => {res.json(resp)}).catch((err) => { next(err)})
        } catch (e) {
            next(e)
        }
    }

    async signup (req, res) {
        await userService.signup(req, res);
    }

}

export default new UserController(userService);