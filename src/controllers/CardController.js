
import _BaseController from './_BaseController';
import ColumnService from "./../services/CardService";
import Column from '../models/dataModels/Card';
import CardService from "../services/CardService";

// const columnService = new ColumnService(
//     new Column().getInstance()
// );

class CardController extends _BaseController {

    constructor(service) {
        super(service);
    }

    // async insert(req, res) {
    //     // should require a board id on the body
    //     return res.status(500).send("INSERT NOT YET IMPLEMENTED")
    // }
    // async delete(req, res) {
    //     return res.status(500).send("DELETE NOT YET IMPLEMENTED")
    // }
    // async update(req, res) {
    //     return res.status(500).send("UPDATE NOT YET IMPLEMENTED")
    // }
    // async getByKey(req, res) {
    //     return res.status(500).send("GET NOT YET IMPLEMENTED")
    // }
}

export default new CardController(CardService);