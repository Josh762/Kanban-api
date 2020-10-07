import User from "../users/user.interface";

interface LoginResponse {
    cookie: string;
    user: User;
}

export default LoginResponse;
