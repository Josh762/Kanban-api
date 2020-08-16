import express from 'express';
import bodyParser from 'body-parser';
import middleware from "./middleware";
import mongoose from "mongoose";

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

        this.initializeControllers(controllers);
        this.initializeMiddlewares(middleware);
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }

    private initializeMiddlewares(middleware:any[]) {
        middleware.forEach((m:any) => {
            this.app.use(m)
        })
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
