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
        const userData = await this.UserDataService._getOneByKeyValue("username", reqBody.username);

        const user = {
            username: userData.data.username,
            password: userData.data.password
        };

        return await jwt.sign(user, 'secretkey', { expiresIn: '1m' });
    }
}

export default UserService;