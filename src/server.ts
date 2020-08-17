import 'dotenv/config';
import App from "./app";
import AuthenticationController from "./authentication/authentication.controller";
import validateEnv from './utils/validateEnv';
import middleware from "./middleware";
validateEnv();

const controllers:any[] = [new AuthenticationController()]

try {
    const app = new App(controllers, middleware)
    app.listen();
} catch(e) {
    console.error(`The server failed to start.\n`,e)
}
