import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

class User {

    initSchema() {
        const schema = new Schema({
            firstName: {
                type: String,
                required: false,
            },
            lastName: {
                type: String,
                required: false
            },
            username: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: false,
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
        mongoose.model("users", schema);
    }
    getInstance() {
        this.initSchema();
        return mongoose.model("users");
    }
}

export default User