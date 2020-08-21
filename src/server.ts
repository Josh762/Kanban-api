import 'dotenv/config';
import BoardsController from "./api/boards/boards.controller";
import WorkflowsController from "./api/workflows/workflows.controller";
import App from "./app";
import AuthenticationController from "./api/authentication/authentication.controller";
import validateEnv from './utils/validateEnv';
import middleware from "./middleware";
validateEnv();

const controllers:any[] = [new AuthenticationController(), new WorkflowsController(), new BoardsController()]

try {
    const app = new App(controllers, middleware)
    app.listen();
} catch(e) {
    console.error(`The server failed to start.\n`,e)
}
