
import {Types} from "mongoose";
import User from "../users/types/interfaces/user.interface";
import CreateWorkflowDTO from "./types/interfaces/createWorkflowDTO";
import FlowNode from "./types/interfaces/flowNode.interface";
import WorkflowDTO from "./types/interfaces/Workflow.dto";
import Workflow from "./types/interfaces/workflow.interface";
import workflowModel from './data-models/workflow.model';
import flowNodeModel from './data-models/flownode.model';

class WorkflowsService {
  private workflowModel = workflowModel;
  private flowNodeModel = flowNodeModel;

  public createWorkflow = async (workflowData: CreateWorkflowDTO, user: User) => {
    const data = await this.workflowModel.create({
      userID: user._id,
      ...workflowData,
      nodes: []
    });

    return data;
  }

  public getWorkflowsForUser = async (userID: Types.ObjectId): Promise<WorkflowDTO[]> => {
    const data = await this.workflowModel.find({userID})

    let workFlows = [];
    if (data.length > 0) {
      for (let wrkflow of data) {
        const flow = new WorkflowDTO(wrkflow);
        workFlows.push(flow);
      }
    }
    return workFlows;
  }

  public createFlowNode = async (flowNode: FlowNode) => {

  }

  public insertFlowNode = async (workflowID: Types.ObjectId, flowNode: FlowNode) => {
    // const node = await this.flowNodeModel.insert({})
    const workflow = await this.workflowModel.findOne({"_id": workflowID})
    let nodes = workflow.nodes;
    const updatedWorkflow = new WorkflowDTO(workflow);
    this.workflowModel.updateOne(workflow,)

  }
}

export default WorkflowsService;
