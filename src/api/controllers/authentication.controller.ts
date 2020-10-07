import express from 'express';
import validateBodyMiddleware from "../../middleware/validate-body.middleware";
import CreateUserDTO from '../../types/data-transfer-objects/users/create-user.dto';
import UserResponseDto from "../../types/data-transfer-objects/users/user-response.dto";

import AuthenticationService from '../services/authentication.service';
import AuthRequestDTO from "../../types/data-transfer-objects/authentication/auth-request.dto";
import RegistrationResponse from "../../types/interface/authentication/registration-response.interface";

import LoginResponseDTO from "../../types/data-transfer-objects/authentication/login-response.dto";
import LoginResponse from "../../types/interface/authentication/login-response.interface";
import User from "../../types/interface/users/user.interface";
import UserResponseDTO from "../../types/data-transfer-objects/users/user-response.dto";

class AuthenticationController {
  public path = '/auth';
  public router = express.Router();
  private AuthenticationService = new AuthenticationService();


  constructor() {
    this.router.post(`${this.path}/register`, validateBodyMiddleware(CreateUserDTO), this.registerNewUser);
    this.router.post(`${this.path}/login`, validateBodyMiddleware(AuthRequestDTO), this.login);
    this.router.post(`${this.path}/logout`, this.logOut);
  }

  private registerNewUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

    try {
      const userData: CreateUserDTO = request.body;
      const user: User = await this.AuthenticationService.register(userData);
      const tokenData: TokenData = this.AuthenticationService.createToken(user);

      // response.setHeader('Set-Cookie', [registerResp.cookie]);
      response.send(new LoginResponseDTO(new UserResponseDTO(user), tokenData.token)); // todo creating these objects seems needlessly expensive?
    } catch (e) {
      next(e)
    }
  }



  private login = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

    try {
      const user: User = await this.AuthenticationService.validateLoginCredentials(request.body);
      const tokenData: TokenData = this.AuthenticationService.createToken(user);

      response.send(new LoginResponseDTO(new UserResponseDTO(user), tokenData.token))
    } catch (error) {
      next(error)
    }

  }

  private logOut = (request: express.Request, response: express.Response) => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']); // todo cookies coming in the future...
    response.send(200);
  }


}

export default AuthenticationController;
