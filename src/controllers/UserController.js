import _BaseController from './_BaseController';
import UserService from "./../services/UserService";

const userService = new UserService();

class UserController extends _BaseController {

    constructor(service) {
        super(service);
        this.login = this.login.bind(this);
    }

    async login (req, res, next) {
        try {
            const {username, password} = req.body;

            // userService.login(req, res, next).then((resp) => {res.json(resp)}).catch((err) => { next(err)})
            const data = await userService.login(username, password);
            res.json(data);
            next();
        } catch (e) {
            const statusCode = parseInt(e.message.replace('Error: ', ''));
            res.sendStatus(statusCode) && next(e)
        }
    }

    async signup (req, res, next) {
        try {
            const {username, password} = req.body;
            await userService.signup(username, password);
            // const data = await userService.login(username, password);
            res.sendStatus(200);
            next();
        } catch (e) {
            const statusCode = parseInt(e.message.replace('Error: ', ''));
            res.sendStatus(statusCode) && next(e)
        }

    }

}

export default new UserController(userService);