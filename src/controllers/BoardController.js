
import _BaseController from './_BaseController';
import BoardService from "./../services/BoardService";

const boardService = new BoardService();

class BoardController extends _BaseController {

    constructor(service) {
        super(service);
    }

}

export default new BoardController(boardService);