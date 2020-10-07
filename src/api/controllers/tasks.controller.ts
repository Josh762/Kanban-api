import express from 'express';

import authMiddleware from "../../middleware/auth.middleware";
import validateBodyMiddleware from "../../middleware/validate-body.middleware";

import {Types} from "mongoose";
import CreateTaskDTO from "../../types/data-transfer-objects/tasks/create-task.dto";
import TaskDTO from "../../types/data-transfer-objects/tasks/task.dto";

import TasksService from '../services/tasks.service';

class TasksController {
    public path = '/tasks';
    public router = express.Router();
    private service = new TasksService();

    constructor() {
        this.router
            .all(`${this.path}*`, authMiddleware)
            .post(`${this.path}`, validateBodyMiddleware(CreateTaskDTO), this.createTask)
            .get(`${this.path}/board/:workflowID`, this.getTaskByWorkflowId)
            .put(`${this.path}/task/:taskID`, validateBodyMiddleware(TaskDTO), this.updateTask);
    }

    // todo delete functionality

    private createTask = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            response.send(await this.service.createTask(request.body));
        } catch (e) {
            next(e);
        }

    }

    private getTaskByWorkflowId = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            return this.service.getTasks(Types.ObjectId(request.params.workflowID));
        } catch (e) {
            next(e);
        }
    }

    private updateTask = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            return this.service.updateTask(request.body)
        } catch (e) {
            next(e);
        }
    }
}

export default TasksController;
