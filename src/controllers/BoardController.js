
import Controller from './Controller';
import BoardService from "./../services/BoardService";
import Board from './../models/Board';

const boardService = new BoardService(
    new Board().getInstance()
);

class BoardController extends Controller {

    constructor(service) {
        super(service);
    }
}

export default new BoardController(boardService);