import mongoose, {Types} from 'mongoose';
import taskModel from "../data-access-models/task.model";
import Task from '../../types/interface/tasks/task.interface';

class TasksService {
    private model = taskModel;

    public createTask = async (task:Task):Promise<Task> => {
        try {
            return await this.model.create(task);
        } catch(e) {
            return e;
        }
    }

    public getTasks = async (workflowID:Types.ObjectId):Promise<Task[]> => {
        try {
            return await this.model.find({'workflow':workflowID});
        } catch(e) {
            return e;
        }
    }

    public updateTask = async (task:Task):Promise<Task> => {
        const result = await this.model.findByIdAndUpdate(task._id, task, {new:true})
        if (result == null) {
            throw new Error('Task does not exist');// todo create custom exception
        }
        return result;
    }
}

export default TasksService;
