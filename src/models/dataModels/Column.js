
import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

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
            position: {
                type: Number,
                required: true
            },
            boardId: {
                type: [String],
                required: true,
                default: []
            }
        }, { timestamps: true });
        schema.plugin(uniqueValidator);
        mongoose.model("columns", schema);
    }
    getInstance() {
        this.initSchema();
        return mongoose.model("columns");
    }
}

export default Column