import express from 'express';
import {Types} from "mongoose";
import authMiddleware from "../../middleware/auth.middleware";
import validateBodyMiddleware from "../../middleware/validate-body.middleware";
import CreateWorkflowDTO from "./interfaces/createWorkflowDTO";
import FlowNode from "./interfaces/flowNode.interface";
import WorkflowDTO from "./interfaces/Workflow.dto";
import Workflow from "./interfaces/workflow.interface";
import WorkflowsService from "./workflows.service";
import cors from 'cors'

class FlowNodeDTO {
}

class WorkflowsController {
  public path = '/workflows';
  public router = express.Router();

  private WorkflowsService = new WorkflowsService();

  constructor() {
    this.initializeRoutes();
    console.log(this.WorkflowsService);

  }

  initializeRoutes() {
    // this.router.get(`${this.path}`,)
    // this.router
    //   .use(cors({
    //     origin: [
    //       'http://localhost:3001',
    //     ],
    //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //     allowedHeaders: ['Content-Type', 'Authorization', 'Cookies']
    //   }))
    this.router
      .all(`${this.path}*`, authMiddleware, validateBodyMiddleware(CreateWorkflowDTO))
      .post(`${this.path}`, this.createWorkflow)
      .get(`${this.path}`, this.getAllWorkflows);
      // .patch(`${this.path}/:id/:`, this.updateWorkflow)
    // this.router
    //   .all(`${this.path}/*`, authMiddleware);
  }

  private createWorkflow = async (request: express.Request, response: express.Response, next: express.NextFunction):WorkflowDTO => {
    try {
      const workflowData: CreateWorkflowDTO = request.body;
      const data = await this.WorkflowsService.createWorkflow(workflowData, request.user);
      response.send(new WorkflowDTO(data));
    } catch (e) {
      next(e);
    }
  }

  private getAllWorkflows = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const data: WorkflowDTO[] = await this.WorkflowsService.getWorkflowsForUser(request.user._id);
      response.send(data)
    } catch (e) {
      next(e);
    }
  }

  private insertFlowNode = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const newFlowNode: FlowNodeDTO = request.body();
      await this.WorkflowsService.insertFlowNode();
      response.status(200);
    } catch (e) {
      next(e);
    }
  }
}

export default WorkflowsController;
