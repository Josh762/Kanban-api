import express from "express";

import BoardsService from "../services/boards.service";
import authMiddleware from "../../middleware/auth.middleware";
import validateBodyMiddleware from "../../middleware/validate-body.middleware";
import CreateBoardDTO from "../../types/data-transfer-objects/boards/create-board.dto";


class BoardsController {
  public path = '/boards';
  public router = express.Router();
  private service = new BoardsService();

  constructor() {
    this.router
        .all(`${this.path}*`, authMiddleware)
        .post(`${this.path}`, validateBodyMiddleware(CreateBoardDTO), this.createBoard)
        .get(`${this.path}`, this.getAllBoardsForUser);
  }

  // TODO, update/delete methods

  private createBoard = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      //@ts-ignore
      request.body.owner = request.user._id; // todo add user to request type
      response.send(await this.service.createBoard(request.body));
    } catch (e) {
      next(e);
    }
  }

  private getAllBoardsForUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    // todo return stubs by default.. return detail by request
    try {
      // @ts-ignore todo add user to request interface
      response.send(await this.service.getAllBoardStubs(request.user['_id']));
    } catch (e) {
      next(e);
    }
  }
}

export default BoardsController;
