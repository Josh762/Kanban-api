
import { IsString } from "class-validator";

class AuthResponseDTO {
    @IsString()
    public bearerToken!: string;

    @IsString()
    public refreshToken!: string;

}

export default AuthResponseDTO;
