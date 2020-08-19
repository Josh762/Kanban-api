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

  private createBoard = async () => {
    try {

    } catch () {

    }
  }

  private getAllBoardsForUser = async () => {


    try {

    } catch (e) {

    }
  }
}

export default BoardsController;
