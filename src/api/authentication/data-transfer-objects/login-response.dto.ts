
import { IsString } from "class-validator";
import UserResponseDTO from "../../users/types/data-transfer-objects/user-response.dto";

class LoginResponseDTO {
    public user: UserResponseDTO;
    public jwt: string;

    constructor(user:UserResponseDTO, jwt:string) {
        this.user = user;
        this.jwt = jwt;
    }
}

export default LoginResponseDTO;
