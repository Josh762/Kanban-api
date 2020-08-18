import User from "./user.interface";
import { IsString } from "class-validator";
import {Types} from "mongoose";

class UserResponseDTO {
    public id: Types.ObjectId;
    public firstName: string;
    public lastName: string;
    public email: string;
    public username: string;

    constructor(user:User) {
        this.id = user._id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.username = user.username
    }
}

export default UserResponseDTO;
