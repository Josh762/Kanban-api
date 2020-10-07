// TODO move logic to service file.


import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserWithThatEmailAlreadyExistsException from "../../exceptions/UserWithThatEmailAlreadyExistsException";
import UserWithThatUserNameAlreadyExistsException from "../../exceptions/UserWithThatUserNameAlreadyExists";
import WrongCredentialsException from "../../exceptions/WrongCredentialsException";
import CreateUserDTO from "../../types/data-transfer-objects/users/create-user.dto";
import User from "../../types/interface/users/user.interface";


import userModel from '../data-access-models/user.model';
import AuthRequestDTO from "../../types/data-transfer-objects/authentication/auth-request.dto";
import DataStoredInToken from "../../types/interface/authentication/data-stored-in-token.interface";

// interface RegistrationResponse {
//   cookie: string;
//   user: User;
// }


class AuthenticationService {
  private user = userModel;


  public register = async (userData: CreateUserDTO):Promise<User> => {

    if (await this.user.findOne({email: userData.email})) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email);
    } else if (await this.user.findOne({username: userData.username})) {
      throw new UserWithThatUserNameAlreadyExistsException(userData.username);
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      return await this.user.create({
        ...userData,
        password: hashedPassword,
      });
    }
  }

  public validateLoginCredentials = async (credentials: AuthRequestDTO):Promise<User> => {
    const query = credentials.username.includes('@') ? {email: credentials.username} : {username: credentials.username};
    const user = await this.user.findOne(query);
    if (user) {
      const isAuthorized = await bcrypt.compare(credentials.password, user.password);

      if (isAuthorized) {
        return user;
      } else {
        throw new WrongCredentialsException();
      }


    } else {
      throw new WrongCredentialsException();
    }
  }

  // public login = async (logInData: AuthRequestDto, asCookie=false):Promise<RegistrationResponse> => {
  //
  //
  //     const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
  //     if (isPasswordMatching) {
  //
  //
  //       const tokenData: TokenData = this.createTokenData(user);
  //       if (asCookie) {
  //         const cookie = this.createCookie(tokenData);
  //         const response: RegistrationResponse = {
  //           cookie,
  //           user
  //         }
  //       } else {
  //         const response: RegistrationResponse = {
  //
  //         }
  //       }
  //
  //
  //       return response;
  //     } else {
  //       throw new WrongCredentialsException(); // todo do I want separate exceptions for username/password?
  //     }
  //
  // }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  public createToken(user: User): TokenData {
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
