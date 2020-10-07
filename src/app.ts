import express from 'express';
import * as fs from "fs";
import mongoose from 'mongoose';
import cors from 'cors';
import https from 'https';
import corsMiddleware from "./middleware/add-cors-headers.middleware";
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
        this.initializeCors();

        this.initializeMiddlewares(middleware);

        this.initializeErrorHandling();

        this.initializeControllers(controllers);

    }

    public listen() {
        // https.createServer({ // TODO Fix SSL
        //     key: fs.readFileSync('.cert/localhost.key'),
        //     cert: fs.readFileSync('.cert/localhost.cert')
        // }, this.app)
        //   .listen(process.env.PORT, () => {
        //     console.log(`App listening on the port ${process.env.PORT}`);
        // });

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

    private initializeCors() {
        this.app.use(cors());
        const whitelist = [
            'http://0.0.0.0:3001', 'http://localhost:3001', 'http://0.0.0.0:7075', 'http://localhost:7075/', 'http://localhost:7075'
        ];
        const corsOptions = {
            origin: function(origin:any, callback:any){
                const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
                originIsWhitelisted ? callback(null, originIsWhitelisted) : callback(new Error('Not allowed by CORS'))
            },
            credentials: true,
            methods: 'GET,POST'

        };
        // this.app.use(cors(corsOptions));

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
