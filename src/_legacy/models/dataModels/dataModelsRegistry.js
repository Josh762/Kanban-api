
import CardModel from './Card'
import ColumnModel from './Column'
import BoardModel from './Board'
import UserModel from './User'


module.exports = {
    Card: new CardModel().getInstance(),
    Column: new  ColumnModel().getInstance(),
    Board: new BoardModel().getInstance(),
    User: new UserModel().getInstance()
};
