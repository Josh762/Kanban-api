import DataService from './dataAccess/DataService';
import {User} from "../models/dataModels/dataModelsRegistry";
import _BaseService from "./_BaseService";
const jwt = require('jsonwebtoken');

class UserService extends _BaseService{
    UserDataService = new DataService(User);

    constructor() {
        super(User);
    }


    signup(req, res) {
        req.body.username = req.body.username.toLowerCase();

        this.UserDataService._getOneByKeyValue("username", req.body.username).then((userData) => {
            // if (userData === null)
            // else throw new Error('Username is already in use');
            res.sendStatus(409);
        }).catch((err) => {
            this.UserDataService._insert(req.body);
            res.sendStatus(200)
        })

    }

    login(req, res) {

        this.UserDataService._getOneByKeyValue("username", req.body.username.toLowerCase()).then((userData) => {

            if (req.body.password !== userData.data.password) throw new Error('Passwords do not match');

            const user = {
                _id: userData.data._id,
                username: userData.data.username,
            };

            res.json( {

                token: jwt.sign(user, 'secretkey', { expiresIn: '60m' })

            })
        }).catch((err) => {
            console.log('ERRRRRR', err);

            res.json({
                        error: true,
                        statusCode: 401,
                        message: err
                    })
        })


    }
}

export default UserService;