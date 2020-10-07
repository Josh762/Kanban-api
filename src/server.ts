import App from "./app";
import 'dotenv/config';
import validateEnv from './utils/validateEnv';
import middleware from "./middleware";

import AuthenticationController from "./api/controllers/authentication.controller"
import BoardsController from "./api/controllers/boards.controller";
import WorkflowsController from "./api/controllers/workflows.controller";
import TasksController from './api/controllers/tasks.controller';

validateEnv();

const controllers:any[] = [
    new AuthenticationController(),
    new WorkflowsController(),
    new BoardsController(),
    new TasksController()
]

try {
    const app = new App(controllers, middleware)
    app.listen();
} catch(e) {
    console.error(`The server failed to start.\n`,e)
}
