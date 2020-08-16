import 'dotenv/config';
import App from "./app";
import AuthenticationController from "./authentication/authentication.controller";
import validateEnv from './utils/validateEnv';

validateEnv();



const controllers:any[] = [new AuthenticationController()]

try {
    const app = new App(controllers)
    app.listen();
} catch(e) {
    console.error(`The server failed to start.\n`,e)
}
