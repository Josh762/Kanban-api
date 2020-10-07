import {Types} from "mongoose";

interface User {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

export default User;
