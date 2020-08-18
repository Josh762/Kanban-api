import DataService from './dataAccess/DataService';
import {User} from "../models/dataModels/dataModelsRegistry";
import _BaseService from "./_BaseService";
const jwt = require('jsonwebtoken');

class UserService extends _BaseService{
    UserDataService = new DataService(User);

    constructor() {
        super(User);
    }


    async signup(username, password) { // TODO hash passwords because storing them as plain text is dumb
        username = username.toLowerCase();

        try {
            const userExists = await User.exists({username})
            if (userExists === false) {
                return await this.UserDataService._insert({username, password});
            }
            else {
                throw new Error('409');
            }
        } catch (e) {
            throw new Error(e.message)
        }



    }

    async login(username, password) {
        try {
            const userData = await this.UserDataService._getOneByKeyValue("username", username.toLowerCase());
            const user = {
                _id: userData._id,
                username: userData.username,
            };
            if (password !== userData.password) {
                throw new Error('401');
            }


            const token = await jwt.sign(user, 'secretkey', {expiresIn: '60m'});

            return {
                user,
                token
            }
        } catch (e) {
            throw new Error(e.message);
        }



        // this.UserDataService._getOneByKeyValue("username", req.body.username.toLowerCase()).then((userData) => {
        //
        //     if (req.body.password !== userData.data.password) throw new Error('Passwords do not match');
        //
        //     const user = {
        //         _id: userData.data._id,
        //         username: userData.data.username,
        //         firstName: userData.data.firstName,
        //         LastName: userData.data.LastName,
        //
        //     };
        //
        //     res.json( {
        //         token: jwt.sign(user, 'secretkey', { expiresIn: '60m' }),
        //         user
        //     })
        // }).catch((err) => {
        //     throw new Error(err.message)
        //     // console.log('ERROR:', err);
        //     // return(err);
        //     // // res.json({
        //     // //             error: true,
        //     // //             statusCode: 401,
        //     // //             message: err
        //     // //         })
        // })


    }
}

export default UserService;