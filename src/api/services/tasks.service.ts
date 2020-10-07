import {Types} from 'mongoose';
import taskModel from "../data-access-models/task.model";
import Task from '../../types/interface/tasks/task.interface';
import TaskDoesNotExistException from "../../exceptions/TaskDoesNotExistException";

class TasksService {
    private model = taskModel;

    public createTask = async (task:Task):Promise<Task> => {
        return this.model.create(task);
    }

    public getTasks = async (workflowID:Types.ObjectId):Promise<Task[]> => {
        return this.model.find({'workflow':workflowID});
    }

    public updateTask = async (task:Task):Promise<Task> => {
        const result = await this.model.findByIdAndUpdate(task._id, task, {new:true})
        if (result == null) {
            throw new TaskDoesNotExistException(task._id.toString());
        }
        return result;
    }
}

export default TasksService;
