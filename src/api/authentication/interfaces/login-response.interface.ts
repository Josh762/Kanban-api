import User from "../../users/types/interfaces/user.interface";

interface LoginResponse {
    cookie: string;
    user: User;
}

export default LoginResponse;
