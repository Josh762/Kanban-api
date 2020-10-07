import mongoose from "mongoose";
import {Types} from "mongoose";
import {FlowNode} from "typescript";
import workflowType from "./workFlowType.enum";

interface Workflow {
  _id: mongoose.Schema.Types.ObjectId;
  userID: Types.ObjectId,
  type: workflowType,
  nodes: [mongoose.Schema.Types.ObjectId]
}

export default Workflow;
