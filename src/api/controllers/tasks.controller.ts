
import express from 'express';
import authMiddleware from "../../middleware/auth.middleware";
import Task from "../../types/interface/tasks/task.interface";
import {Types} from "mongoose";

import TasksService from '../services/tasks.service';

class TasksController {
    public path = '/tasks';
    public router = express.Router();
    private service = new TasksService();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(`${this.path}`, authMiddleware, this.createTask);
        this.router.get(`${this.path}/board/:workflowID`, authMiddleware, this.getTaskByWorkflowId);
        this.router.put(`${this.path}/task/:taskID`, authMiddleware, this.updateTask);
    }

    // todo delete functionality

    private createTask = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            // request.params.workflowID
            const taskResp = await this.service.createTask(request.body);
            console.log('**', taskResp);
            response.send(taskResp);
        } catch (e) {
            console.log(e); // todo handle error
        }

    }

    private getTaskByWorkflowId = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            return this.service.getTasks(Types.ObjectId(request.params.workflowID));
        } catch (e) {
            console.log(e);
        }
    }

    private updateTask = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            return this.service.updateTask(request.body)
        } catch (e) {

        }
    }
}

export default TasksController;
