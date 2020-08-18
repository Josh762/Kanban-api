
import SuccessFacade from './SuccessFacade';

class BoardFacade {

    // board = {};
    constructor() {
        this.wrap = this.wrap.bind(this);
        // this.wrap(board, columns, cards);
    }

    // TODO make this a static function
    wrap(boardInfo, columns, cards) {
        let board = {};
        board.title = boardInfo.title;
        board.description = boardInfo.description;
        board.columns = {};

        columns.forEach((col, count)=> {
            col.cards = {};
            board.columns[col.position] = {
                id: col._id,
                title: col.title,
                content: col.content || "",
                cards: {}
            };

            cards[col._id].forEach((card, index) => {
                board.columns[col.position].cards[card.position] = card;
            })

        });

        /*
        * {
        *   title: "...",
        *   description: "...",
        *   columns: {
        *       position: {
        *           title: "...",
        *           description: "...",
        *           cards: {
        *               position: {
        *                   title: "...",
        *                   content: "..."
        *               },
        *               position: {},
        *               position: {}
        *           }
        *       },
        *       columnId: {...},
        *       columnId: {...}
        *   }
        * }
        *
        * */


        return board;

    }

}

export default BoardFacade;