
import boardsModel from '../data-access-models/boards.model';
import board from '../../types/interface/boards/board.interface';
import BoardDTO from "../../types/data-transfer-objects/boards/board.dto";
import {Types} from "mongoose";

class BoardsService {
  private boards = boardsModel;


  public createBoard = async (b:board): Promise<board> => {

    // todo may want to verify board title is not duplicate for user
    try {
      return await this.boards.create(b);
    } catch (e) {
      return e;
    }
  }

  public getAllBoardStubs = async (userID: Types.ObjectId):Promise<board[]> => {
    try {
      const result = await this.boards.find({owner: userID});
      console.log(result);
      return result;
    } catch(e) {
      console.log('eee',e)
      return e;
    }
  }
}


export default BoardsService;
