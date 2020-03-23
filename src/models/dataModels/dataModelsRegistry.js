
import CardModel from './Card'
import ColumnModel from './Column'
import BoardModel from './Board'


module.exports = {
    Card: new CardModel().getInstance(),
    Column: new  ColumnModel().getInstance(),
    Board: new BoardModel().getInstance()
};
