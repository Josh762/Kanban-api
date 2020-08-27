
import {Types} from "mongoose";
import User from "../users/interfaces/user.interface";
import CreateWorkflowDTO from "./interfaces/createWorkflowDTO";
import FlowNode from "./interfaces/flowNode.interface";
import WorkflowDTO from "./interfaces/Workflow.dto";
import Workflow from "./interfaces/workflow.interface";
import workflowModel from './workflow.model';
import flowNodeModel from './flownode.model';

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
