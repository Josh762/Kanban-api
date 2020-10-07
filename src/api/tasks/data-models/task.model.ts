import mongoose, {Types} from 'mongoose';
import Task from '../types/interfaces/task.interface';
const taskSchema = new mongoose.Schema({
    title: mongoose.Schema.Types.String,
    description: mongoose.Schema.Types.String
    // todo comments
})

const taskModel = mongoose.model<Task & mongoose.Document>('Task', taskSchema)
export default taskModel;
