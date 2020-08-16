import mongoose from "mongoose";

class Connection {
    constructor() {
        const url =
            process.env.MONGODB_URI || `mongodb+srv://JoshB762:DCC0cl8Tjd6n46yF@cluster0-kds2y.mongodb.net/test?retryWrites=true&w=majority`;
        console.log("Establish new connection with url", url);
        mongoose.Promise = global.Promise;
        mongoose.set("useNewUrlParser", true);
        mongoose.set("useFindAndModify", false);
        mongoose.set("useCreateIndex", true);
        mongoose.set("useUnifiedTopology", true);
        mongoose.connect(url);
    }
}

export default new Connection();