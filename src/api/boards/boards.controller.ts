import express from "express";




class BoardsController {
  public path = '/boards';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.getAllBoardsForUser)
  }

  private createBoard = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const newBoardData:CreateBoardDTO = request.body;
    } catch (e) {

    }
  }

  private getAllBoardsForUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {


    try {

    } catch (e) {

    }
  }
}

export default BoardsController;
