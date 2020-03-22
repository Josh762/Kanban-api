
import Controller from './Controller';
import BoardService from "./../services/BoardService";
import Board from '../models/dataModels/Board';

const boardService = new BoardService(
    // new Board().getInstance()
);

class BoardController extends Controller {

    constructor(service) {
        super(service);
        this.getAll = this.getAll.bind(this);
    }

    async getAll(req, res) {
        return res.status(200).send(await this.service.test(req.query));
    }

    async getByKey(req, res) {
        const {id} = req.params;
        return res.status(200).send(await this.service.getBoard(id));
    }
}

export default new BoardController(boardService);