import User from "../interfaces/user.interface";
import { IsString } from "class-validator";
import {Types} from "mongoose";

class UserResponseDTO {
    public firstName: string;
    public lastName: string;
    public email: string;
    public username: string;

    constructor(user:User) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.username = user.username
    }
}

export default UserResponseDTO;
