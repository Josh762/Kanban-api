
import Service from "./Service";
import ColumnService from "./ColumnService";
import DataService from '../dataAccess/DataService';
import BoardModel from '../models/dataModels/Board';
import ColumnModel from '../models/dataModels/Column';
import CardModel from '../models/dataModels/Card';

import SuccessFacade from '../models/facades/SuccessFacade';
import BoardFacade from '../models/facades/BoardFacade';

class BoardService extends Service {

    BoardDataService = new DataService(new BoardModel().getInstance());
    ColumnDataService = new DataService(new ColumnModel().getInstance());
    CardDataService = new DataService(new CardModel().getInstance());
    boardFacade = new BoardFacade();
    constructor(model) {
        // super(model);
        super();
        // this.BoardDataService = this.BoardDataService.bind(this);
        // this.ColumnDataService = this.ColumnDataService.bind(this);
        this.getBoard = this.getBoard.bind(this);
        this.test = this.test.bind(this);
    }

    async getBoard(id) {
        try {
            let board = await this.BoardDataService._getByPrimaryKey(id);
            let columns = await this.ColumnDataService._getByKeyValue('boardId', id);
            let cards = {};

            for (const column of columns.data) { // TODO this is broken?
                const colId = column._id;
                let card = await this.CardDataService._getByKeyValue('columnId', colId);
                cards[column.id] = card.data;
            }

            // TODO need to wrap this in a success/failure facade.. {status, error, data, ...}
            return this.boardFacade.wrap(board.data, columns.data, cards);
        } catch(error) {

        }

    }

    async test(query) {
        return await this.BoardDataService._getAll(query);
    }
}

export default BoardService;