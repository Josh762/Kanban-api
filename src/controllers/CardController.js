
import Controller from './Controller';
import ColumnService from "./../services/CardService";
import Column from '../models/dataModels/Card';

// const columnService = new ColumnService(
//     new Column().getInstance()
// );

class CardController {

    constructor() {

    }

    async insert(req, res) {
        // should require a board id on the body
        return res.status(500).send("INSERT NOT YET IMPLEMENTED")
    }
    async delete(req, res) {
        return res.status(500).send("DELETE NOT YET IMPLEMENTED")
    }
    async update(req, res) {
        return res.status(500).send("UPDATE NOT YET IMPLEMENTED")
    }
    async getByKey(req, res) {
        return res.status(500).send("GET NOT YET IMPLEMENTED")
    }
}

export default new CardController();