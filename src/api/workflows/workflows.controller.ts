import express from 'express';
import authMiddleware from "../../middleware/auth.middleware";
import validateBodyMiddleware from "../../middleware/validate-body.middleware";
import CreateWorkflowDTO from "./types/interfaces/createWorkflowDTO";
import WorkflowDTO from "./types/interfaces/Workflow.dto";
import WorkflowsService from "./workflows.service";

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
        this.router
            .all(`${this.path}*`, authMiddleware, validateBodyMiddleware(CreateWorkflowDTO))
            .post(`${this.path}`, this.createWorkflow)
            .get(`${this.path}`, this.getAllWorkflows);
    }

    private createWorkflow = async (request: express.Request, response: express.Response, next: express.NextFunction): WorkflowDTO => {
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
