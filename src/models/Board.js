
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
            columns: {
                type: [String],
                required: true,
                default: []
            }
        })
    }
}