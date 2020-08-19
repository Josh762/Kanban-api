import CreateUserDTO from "../../users/data-transfer-objects/create-user.dto";
import AuthenticationService from "../authentication.service";
import UserWithThatEmailAlreadyExistsException from "../../../exceptions/UserWithThatEmailAlreadyExistsException";
// import typeorm from 'typeorm';
import {connect, clearDatabase, closeDatabase} from '../../../test-db';
beforeAll(async () => await connect())
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('AuthenticationService', () => {

  describe('when creating a cookie', () => {
    const authenticationService = new AuthenticationService();

    const tokenData: TokenData = {
      token: '',
      expiresIn: 1,
    };
    it('should return a string', () => {
      expect(typeof authenticationService.createCookie(tokenData))
        .toEqual('string');
    })
  });

  describe('when registering a user', () => {
    // todo this test fails at mongoose findone call
    describe('if the email is already taken', () => {
      it('should throw an error', async () => {
        const userData: CreateUserDTO = {
          firstName: 'John',
          lastName: 'Smith',
          username: 'jonhsmith',
          email: 'john@smith.com',
          password: 'strongPassword123',
        };
        // (typeorm as any).getRepository.mockReturnValue({
        //   findOne: () => Promise.resolve(userData),
        // });
        const authenticationService = new AuthenticationService();
        await expect(async () => await authenticationService.register(userData))
          .toThrow()
          // .rejects.toMatchObject(new UserWithThatEmailAlreadyExistsException(userData.email));
      });
    });
  });

  // describe("when registering a new user with an existing email", () => {
  //   const newUser:CreateUserDTO = {
  //     "firstName": "Josh",
  //     "lastName": "Brewster",
  //     "email": "joshemaial@email.com",
  //     "username": "Joshua",
  //     "password": "1123"
  //   }
  //
  //   it('should return an exception UserWithThatEmailAlreadyExists', async () => {
  //       // await expect(authenticationService.register(newUser)).rejects.toThrow('error')
  //     await expect(authenticationService.register(newUser)).resolves.toBe('peanut butter');
  //
  //
  //   })
  // })

})
