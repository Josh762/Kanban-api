// TODO move logic to service file.


import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BaseHttpException from "../../exceptions/BaseHttpException";
import UserWithThatEmailAlreadyExistsException from "../../exceptions/UserWithThatEmailAlreadyExistsException";
import UserWithThatUserNameAlreadyExistsException from "../../exceptions/UserWithThatUserNameAlreadyExists";
import WrongCredentialsException from "../../exceptions/WrongCredentialsException";
import CreateUserDTO from "../users/data-transfer-objects/create-user.dto";
import UserResponseDto from "../users/data-transfer-objects/user-response.dto";
import User from "../users/interfaces/user.interface";


import userModel from '../users/user.model';
import AuthRequestDTO from "./data-transfer-objects/auth-request-d-t.o";
import DataStoredInToken from "./interfaces/data-stored-in-token.interface";
import RegistrationResponse from "./interfaces/registration-response.interface";

// interface RegistrationResponse {
//   cookie: string;
//   user: User;
// }


class AuthenticationService {
  private user = userModel;


  public register = async (userData: CreateUserDTO):Promise<RegistrationResponse> => {
    if (await this.user.findOne({email: userData.email})) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email);
    } else if (await this.user.findOne({username: userData.username})) {
      throw new UserWithThatUserNameAlreadyExistsException(userData.username);
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await this.user.create({
        ...userData,
        password: hashedPassword,
      });

      const tokenData: TokenData = this.createTokenData(user);
      const cookie = this.createCookie(tokenData);

      const response: RegistrationResponse = {
        cookie,
        user
      }

      return response;
    }
  }

  public login = async (logInData: AuthRequestDTO):Promise<RegistrationResponse> => {
    const query = logInData.username.includes('@') ? {email: logInData.username} : {username: logInData.username};
    const user = await this.user.findOne(query);

    if (user) {
      const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
      if (isPasswordMatching) {


        const tokenData: TokenData = this.createTokenData(user);
        const cookie = this.createCookie(tokenData);
        const response: RegistrationResponse = {
          cookie,
          user
        }
        return response;
      } else {
        throw new WrongCredentialsException(); // todo do I want separate exceptions for username/password?
      }
    } else {
      throw new WrongCredentialsException();
    }
  }


  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  private createTokenData(user: User): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: String(user._id),
    };

    // TODO need a better secret
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret || "secret", {expiresIn}),
    };
  }

}

export default AuthenticationService;
