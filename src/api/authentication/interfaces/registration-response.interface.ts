import User from "../../users/interfaces/user.interface";

interface RegistrationResponse {
  cookie: string;
  user: User;
}

export default RegistrationResponse;
