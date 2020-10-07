import User from "../../interface/users/user.interface";
import { IsString } from "class-validator";

class CreateUserDTO {
    @IsString()
    public firstName!: string;

    @IsString()
    public lastName!: string;

    @IsString()
    public email!: string;

    @IsString()
    public username!: string;

    @IsString()
    public password!: string;

}

export default CreateUserDTO;
