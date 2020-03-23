
import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

class Card {


    constructor() {
        if (!!Card.instance) {
            this.getInstance();
        }

        Card.instance = this;

        return this;
    }

    initSchema() {
        const schema = new Schema({
            title: {
                type: String,
                required: true,
            },
            content: {
                type: String,
                required: false,
            },
            position: {
                type: Number,
                required: true
            },
            columnId: {
                type: String,
                required: true
            }
        }, { timestamps: true });

        schema.plugin(uniqueValidator);
        mongoose.model("cards", schema);
    }

    getInstance() {
        this.initSchema();
        return mongoose.model("cards");
    }
}

export default Card;