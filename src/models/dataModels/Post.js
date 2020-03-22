//src/models/Post.js
import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

class Post {

    initSchema() {
        const schema = new Schema({
            title: {
                type: String,
                required: true,
            },
            slug: String,
            subtitle: {
                type: String,
                required: false,
            },
            description: {
                type: String,
                required: false,
            },
            content: {
                type: String,
                required: true,
            }
        }, { timestamps: true });
        schema.plugin(uniqueValidator);
        mongoose.model("posts", schema);
    }

    getInstance() {
        this.initSchema();
        return mongoose.model("posts");
    }
}

export default Post;