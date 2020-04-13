
import _BaseController from './_BaseController';
import BoardService from "./../services/BoardService";

const boardService = new BoardService();

class BoardController extends _BaseController {

    constructor(service) {
        super(service);
    }

    async getByKeyValue(req, res) {
        const { id } = req.params;
        return res.status(200).send(await this.service.getByKeyValue({'userId':id}));
    }

}

export default new BoardController(boardService);