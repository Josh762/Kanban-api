
import _BaseController from './_BaseController';
import ColumnService from "../services/CardService";
import Column from '../models/dataModels/Card';
import CardService from "../services/CardService";
import BoardService from "../services/BoardService";
const cardService = new CardService();

// const columnService = new ColumnService(
//     new Column().getInstance()
// );

class CardController extends _BaseController {

    constructor(service) {
        super(service);
    }

    async getByKeyValue(req, res) {
        const { id } = req.params;
        return res.status(200).send(await this.service.getByKeyValue({'columnId': id}));
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

export default new CardController(cardService);
