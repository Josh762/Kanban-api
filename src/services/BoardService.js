import DataService from './dataAccess/DataService';
import {Board, Card, Column} from '../models/dataModels/dataModelsRegistry';

import SuccessFacade from '../models/facades/SuccessFacade';
import BoardFacade from '../models/facades/BoardFacade';
import _BaseService from "./_BaseService";
// import BoardModel from '../models/dataModels/Board';
// import ColumnModel from '../models/dataModels/Column';
// import CardModel from '../models/dataModels/Card';

class BoardService extends _BaseService {

    BoardDataService = new DataService(Board);
    ColumnDataService = new DataService(Column);
    CardDataService = new DataService(Card);
    boardFacade = new BoardFacade();
    #successFacade = new SuccessFacade();

    constructor() {
        super(Board);
        this.getById = this.getById.bind(this);
        this.insert = this.insert.bind(this);
    }

    async getById(id) {
        return await this.#getBoard(id);
    }

    async insert(data) {
        let board = await this.BaseDataService._insert(data);
        await this.ColumnDataService._insert({title: 'Backlog', description: '', boardId: board._id});
        await this.ColumnDataService._insert({title: 'To Do', description: '', boardId: board._id});
        await this.ColumnDataService._insert({title: 'In Progress', description: '', boardId: board._id});
        await this.ColumnDataService._insert({title: 'Done', description: '', boardId: board._id});

    }

    async #getBoard(id) {
        console.log('here');
        return await this.BoardDataService._getByPrimaryKey(id);
    }

    async #getBoardDetails(id) {
        try {
            let board = await this.BoardDataService._getByPrimaryKey(id);
            let columns = await this.ColumnDataService._getByKeyValue('boardId', id);

            console.log('board', board.data);
            console.log('columns', columns.data);

            let cards = {};
            let data = board.data;
            data.columns = columns.data;
            for (const column of data.columns) {
                const colId = column._id;
                let card = await this.CardDataService._getByKeyValue('columnId', colId);
                column.cards = card.data;

            }

            console.log(data);


            // const data = this.boardFacade.wrap(board.data, columns.data, cards);
            return this.#successFacade.wrap(true, data);
        } catch(error) {
            console.log('ERR', error);

            return this.#successFacade.wrap(false, error)
        }

    }

}

export default BoardService;