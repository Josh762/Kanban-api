import {Types} from "mongoose";

import board from '../../types/interface/boards/board.interface';
import CreateBoardDTO from "../../types/data-transfer-objects/boards/create-board.dto";

import boardsModel from '../data-access-models/boards.model';

class BoardsService {
    private boardsModel = boardsModel;

    public createBoard = async (b: CreateBoardDTO): Promise<board> => {
        return await this.boardsModel.create(b);
    }

    public getAllBoardStubs = async (userID: Types.ObjectId): Promise<board[]> => {
        return this.boardsModel.find({owner: userID});
    }

    public getBoardStub = async (boardID: Types.ObjectId) => {
        return this.boardsModel.find({_id: boardID});
    }

    public getBoardDetails = async (boardID: Types.ObjectId) => {
        return this.boardsModel
            .find({_id: boardID})
            .populate({
                path: 'workflow',
                model: 'Workflow',
                populate: {
                    path: 'nodes',
                    model: 'FlowNode',
                    populate: {
                        path: 'tasks',
                        model: 'Task'
                    }
                }
            });

    }
}


export default BoardsService;
