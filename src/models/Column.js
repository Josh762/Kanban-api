
import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import slugify from "./Post";

class Column {

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
            boardId: {
                type: [String],
                required: true,
                default: []
            }
        }, { timestamps: true });
        schema.pre(
            "save",
            function(next) {
                let post = this;
                if (!post.isModified("title")) {
                    return next();
                }
                return next();
            },
            function(err) {
                next(err);
            }
        );
        schema.plugin(uniqueValidator);
        mongoose.model("columns", schema);
    }
    getInstance() {
        this.initSchema();
        return mongoose.model("columns");
    }
}

export default Column