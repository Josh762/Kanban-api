
import { IsString } from "class-validator";

class AuthRequestDto {
    @IsString()
    public username!: string;

    @IsString()
    public password!: string;

}

export default AuthRequestDto;
