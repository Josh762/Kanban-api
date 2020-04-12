import DataService from '../dataAccess/DataService';
import {User} from "../models/dataModels/dataModelsRegistry";
import _BaseService from "./_BaseService";
const jwt = require('jsonwebtoken');

class UserService extends _BaseService{
    UserDataService = new DataService(User);

    constructor() {
        super(User);
    }

    async login(reqBody) {
        const user = await this.UserDataService._getByKeyValue("username", reqBody.username);
        jwt.sign(user, 'secretkey', { expiresIn: '1m' }, (err, token) => {
            // console.log({token})
            return token
        });
    }
}

export default UserService;