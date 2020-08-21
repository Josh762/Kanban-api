import express from 'express';
import authMiddleware from "../../middleware/auth.middleware";
import validateBodyMiddleware from "../../middleware/validate-body.middleware";
import CreateWorkflowDTO from "./interfaces/createWorkflowDTO";
import WorkflowDTO from "./interfaces/Workflow.dto";
import Workflow from "./interfaces/workflow.interface";
import WorkflowsService from "./workflows.service";


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
    this.router.post(`${this.path}`, authMiddleware, validateBodyMiddleware(CreateWorkflowDTO), this.createWorkflow);
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

  private getAllWorkflows(request: express.Request, response: express.Response, next: express.NextFunction) {
    try {

    } catch (e) {

    }
  }
}

export default WorkflowsController;
