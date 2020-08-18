import express from 'express';
import mongoose from 'mongoose';

import errorMiddleware from "./middleware/error.middleware";

class App {
    public app: express.Application;
    public version: string;

    // todo controllers needs a type
    constructor(
        controllers:any[] = [],
        middleware:any[] = [],
        version:string = 'v1') {
        this.app = express();
        this.version = version;

        this.connectToTheDatabase();
        this.initializeMiddlewares(middleware);

        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }

    private initializeMiddlewares(middleware:any[]) {
        // this.app.use(bodyParser.json())
        middleware.forEach((m:any) => {
            this.app.use(m)
        })
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeControllers(controllers:any) {
        controllers.forEach((controller:any) => {
            this.app.use(`/api/${this.version}`, controller.router);
        });
    }

    private connectToTheDatabase() {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_DB_NAME,
            MONGO_PATH,
        } = process.env;
        const connection = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-kds2y.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`
        mongoose.connect(connection);
    }


}

export default App;
