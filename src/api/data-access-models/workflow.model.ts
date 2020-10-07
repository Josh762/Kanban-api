import mongoose, {Types} from 'mongoose';
import Workflow from "../../types/interface/workflows/workflow.interface";


const workflowSchema = new mongoose.Schema({
  userID: mongoose.Schema.Types.ObjectId,
  type: String,
  nodes: [
    {
      ref: 'FlowNode',
      type: mongoose.Schema.Types.ObjectId
    }
  ]
})

const workflowModel = mongoose.model<Workflow & mongoose.Document>('Workflow', workflowSchema);
export default workflowModel;
