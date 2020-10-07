import User from "../users/user.interface";

interface RegistrationResponse {
  cookie: string;
  user: User;
}

export default RegistrationResponse;
