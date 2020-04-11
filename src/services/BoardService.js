
import DataService from '../dataAccess/DataService';
// import BoardModel from '../models/dataModels/Board';
// import ColumnModel from '../models/dataModels/Column';
// import CardModel from '../models/dataModels/Card';

import {Board, Column, Card} from '../models/dataModels/dataModelsRegistry';

import SuccessFacade from '../models/facades/SuccessFacade';
import BoardFacade from '../models/facades/BoardFacade';

class BoardService {

    BoardDataService = new DataService(Board);
    ColumnDataService = new DataService(Column);
    CardDataService = new DataService(Card);
    boardFacade = new BoardFacade();
    #successFacade = new SuccessFacade();

    constructor() {
        console.log('constructor');
        this.getById = this.getById.bind(this);
    }

    async getById(id) {
        return await this.#getBoard(id);
    }

    async #getBoard(id) {
        try {
            let board = await this.BoardDataService._getByPrimaryKey(id);
            let columns = await this.ColumnDataService._getByKeyValue('boardId', id);
            let cards = {};

            for (const column of columns.data) {
                const colId = column._id;
                let card = await this.CardDataService._getByKeyValue('columnId', colId);
                cards[column.id] = card.data;
            }

            const data = this.boardFacade.wrap(board.data, columns.data, cards);
            return this.#successFacade.wrap(true, data);
        } catch(error) {
            console.log('ERR', error);

            return this.#successFacade.wrap(false, error)
        }

    }

}

export default BoardService;