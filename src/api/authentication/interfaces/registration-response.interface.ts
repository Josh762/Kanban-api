import User from "../../users/types/interfaces/user.interface";

interface RegistrationResponse {
  cookie: string;
  user: User;
}

export default RegistrationResponse;
