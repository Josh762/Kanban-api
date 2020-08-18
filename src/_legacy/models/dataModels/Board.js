
import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

class Board {

    initSchema() {
        const schema = new Schema({
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: false,
            },
            userId: {
                type: String,
                required: true
            }
        }, { timestamps: true });
        // schema.pre(
        //     "save",
        //     function(next) {
        //         let post = this;
        //         if (!post.isModified("title")) {
        //             return next();
        //         }
        //         return next();
        //     },
        //     function(err) {
        //         next(err);
        //     }
        // );
        // schema.plugin(uniqueValidator);
        mongoose.model("boards", schema);
    }
    getInstance() {
        this.initSchema();
        return mongoose.model("boards");
    }
}

export default Board