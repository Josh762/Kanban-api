import express from "express";
import { Types } from "mongoose";

import authMiddleware from "../../middleware/auth.middleware";
import validateBodyMiddleware from "../../middleware/validate-body.middleware";

import BoardsService from "../services/boards.service";
import CreateBoardDTO from "../../types/data-transfer-objects/boards/create-board.dto";



class BoardsController {
  public path = '/boards';
  public router = express.Router();
  private service = new BoardsService();

  constructor() {
    this.router
      .all(`${this.path}*`, authMiddleware)
      .post(`${this.path}`, validateBodyMiddleware(CreateBoardDTO), this.createBoard)
      .get(`${this.path}/:boardId`, this.getBoard)
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

  private getBoard = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      /*
        todo, possibly need a middleware that does all the heavy lifting of checking
         if query param exists and if it has a value of true.
         Should have a couple of these that throw exceptions if the arg is not something expected.
      */
      if (Object.keys(request.query).includes('stub')) {
        response.send(await this.service.getBoardStub(Types.ObjectId(request.params.boardId)));
      } else {
        response.send(await this.service.getBoardDetails(Types.ObjectId(request.params.boardId)));
      }
    } catch (e) {
      next(e);
    }
  }
}

export default BoardsController;
