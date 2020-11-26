import express from 'express';
import {Types} from 'mongoose';

import authMiddleware from '../../middleware/auth.middleware';
import validateBodyMiddleware from '../../middleware/validate-body.middleware';

import WorkflowsService from '../services/workflows.service';
import CreateWorkflowDTO from '../../types/interface/workflows/createWorkflowDTO';
import CreateFlowNodeDTO from '../../types/data-transfer-objects/workflows/CreateFlowNode.dto';

class WorkflowsController {
    public path = '/workflows';
    public router = express.Router();

    private WorkflowsService = new WorkflowsService();

    constructor() {
        this.router
            .all(`${this.path}*`, authMiddleware)
            .post(`${this.path}`, validateBodyMiddleware(CreateWorkflowDTO), this.createWorkflow)
            // .post(`${this.path}/:workflowId/flownodes/:flownodeId`, validateBodyMiddleware(CreateFlowNodeDTO), this.insertFlowNode)
            .post(`${this.path}/flownode`, validateBodyMiddleware(CreateFlowNodeDTO), this.createFlowNode)
            .get(`${this.path}/:workflowId`, this.getWorkflow)
            .get(`${this.path}`, this.getAllWorkflows);

    }

    private createWorkflow = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            // @ts-ignore
            response.send(await this.WorkflowsService.createWorkflow(request.body, request.user));
        } catch (e) {
            next(e);
        }
    }

    private getWorkflow = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            response.send(await this.WorkflowsService.getWorkflow(Types.ObjectId(request.params.workflowId)))
        } catch (e) {
            next(e);
        }
    }

    private getAllWorkflows = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            // @ts-ignore
            response.send(await this.WorkflowsService.getWorkflowsForUser(request.user._id))
        } catch (e) {
            next(e);
        }
    }

    // // todo, probably don't need this. should probably use an update workflow function.
    // private insertFlowNode = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    //     // try {
    //     //     response.send(await this.WorkflowsService.createFlowNode(Types.ObjectId(request.params.workflowId), Types.ObjectId(request.params.flownodeId)));
    //     // } catch (e) {
    //     //     next(e);
    //     // }
    // }

    private createFlowNode = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            response.send(await this.WorkflowsService.createFlowNode(request.body));
        } catch (e) {
            next(e);
        }
    }
}

export default WorkflowsController;
