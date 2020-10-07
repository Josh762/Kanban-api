
import boardsModel from '../data-access-models/boards.model';
import board from '../../types/interface/boards/board.interface';
import BoardDTO from "../../types/data-transfer-objects/boards/board.dto";
import {Types} from "mongoose";
import CreateBoardDTO from "../../types/data-transfer-objects/boards/create-board.dto";

class BoardsService {
  private boards = boardsModel;


  public createBoard = async (b:CreateBoardDTO): Promise<board> => {
    return await this.boards.create(b);
  }

  public getAllBoardStubs = async (userID: Types.ObjectId):Promise<board[]> => {
    return this.boards.find({owner: userID});
  }
}


export default BoardsService;
