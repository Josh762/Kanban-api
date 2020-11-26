import mongoose, {Types} from 'mongoose';
import FlowNode from '../../types/interface/workflows/flowNode.interface';

const flowNodeSchema = new mongoose.Schema({
  status: String,
  tasks: [ // todo may be more efficient for tasks to have a flowNode Id than a flownode to have a bunch of task ids..
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
