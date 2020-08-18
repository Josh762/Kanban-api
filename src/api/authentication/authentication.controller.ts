import bcrypt from 'bcrypt'
import express from 'express';
import WrongCredentialsException from '../../exceptions/WrongCredentialsException';
import validationMiddleware from "../../middleware/validation.middleware";
import CreateUserDTO from '../users/data-transfer-objects/create-user.dto';
import UserResponseDto from "../users/data-transfer-objects/user-response.dto";
import User from "../users/interfaces/user.interface";
import userModel from '../users/user.model';

import AuthenticationService from './authentication.service';
import AuthRequestDTO from "./data-transfer-objects/auth-request-d-t.o";
import RegistrationResponse from "./interfaces/registration-response.interface";


class AuthenticationController {
  public path = '/auth';
  public router = express.Router();
  private user = userModel;

  private AuthenticationService = new AuthenticationService();


  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDTO), this.registerNewUser);
    this.router.post(`${this.path}/login`, validationMiddleware(AuthRequestDTO), this.login);
    this.router.post(`${this.path}/logout`, this.logOut);
  }

  private registerNewUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

    try {
      const userData: CreateUserDTO = request.body;
      const registerResp: RegistrationResponse = await this.AuthenticationService.register(userData);

      response.setHeader('Set-Cookie', [registerResp.cookie]);
      response.send(new UserResponseDto(registerResp.user));
    } catch (e) {
      next(e)
    }
  }

  private login = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

    try {
      const logInData: AuthRequestDTO = request.body;
      const loginResponse: RegistrationResponse = await this.AuthenticationService.login(logInData);

      response.setHeader('Set-Cookie', [loginResponse.cookie]);
      response.send(new UserResponseDto(loginResponse.user))
    } catch (error) {
      next(error)
    }

  }

  private logOut = (request: express.Request, response: express.Response) => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    response.send(200);
  }


}

export default AuthenticationController;
