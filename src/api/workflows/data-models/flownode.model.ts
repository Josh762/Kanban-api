import mongoose, {Types} from 'mongoose';
import FlowNode from '../types/interfaces/flowNode.interface';

const flowNodeSchema = new mongoose.Schema({
  status: String,
  tasks: [
    {
      ref: 'Task',
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  to: [
    {
      ref: 'FlowNode',
      type: mongoose.Schema.Types.ObjectId
    }
  ],
})

const flowNodeModel = mongoose.model<FlowNode & mongoose.Document>('FlowNode', flowNodeSchema)
export default flowNodeModel;
