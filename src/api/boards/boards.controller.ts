import express from "express";

import boardModel from './models/boards.model';
import BoardDTO from './data-transfer-objects/board.dto';
import BoardsService from "./boards.service";
import authMiddleware from "../../middleware/auth.middleware";


class BoardsController {
  public path = '/boards';
  public router = express.Router();
  private service = new BoardsService();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    //todo use auth middleware
    this.router.post(`${this.path}`, authMiddleware, this.createBoard)
    this.router.get(`${this.path}`, authMiddleware, this.getAllBoardsForUser)
  }

  private createBoard = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      let newBoard = request.body;
      //@ts-ignore
      newBoard.owner = request.user._id;
      // const board = new BoardDTO(request.body);
      const createdData = await this.service.createBoard(newBoard);
      response.send(createdData);
    } catch (e) {
      console.log(e) // todo, handle error
    }
  }

  private getAllBoardsForUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    // todo return stubs by default.. return detail by request
    try {
      //default case
      // @ts-ignore todo add user to request interface
      const boards = await this.service.getAllBoardStubs(request.user['_id']);

      response.send(boards);
    } catch (e) {
      console.log(e); // todo, handle error
    }
  }
}

export default BoardsController;
