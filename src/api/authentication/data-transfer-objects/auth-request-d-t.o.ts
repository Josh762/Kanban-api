
import { IsString } from "class-validator";

class AuthRequestDTO {
    @IsString()
    public username!: string;

    @IsString()
    public password!: string;

}

export default AuthRequestDTO;
