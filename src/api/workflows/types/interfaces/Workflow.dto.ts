
import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import WorkFlowType from './workFlowType.enum'
import Workflow from "./workflow.interface";
import {IsEnum} from "class-validator";

class WorkflowDTO {
  public _id: mongoose.Schema.Types.ObjectId;
  public type: WorkFlowType;
  public nodes: [mongoose.Schema.Types.ObjectId];
  //
  constructor(workflow:Workflow) {
    this._id = workflow._id;
    this.type = workflow.type;
    this.nodes = workflow.nodes;

  }

}

export default WorkflowDTO;
