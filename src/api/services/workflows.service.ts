
import {Types} from "mongoose";
import User from "../../types/interface/users/user.interface";
import CreateWorkflowDTO from "../../types/interface/workflows/createWorkflowDTO";
import FlowNode from "../../types/interface/workflows/flowNode.interface";
import WorkflowDTO from "../../types/interface/workflows/Workflow.dto";
import Workflow from "../../types/interface/workflows/workflow.interface";
import workflowModel from '../data-access-models/workflow.model';
import flowNodeModel from '../data-access-models/flownode.model';
import CreateFlowNodeDTO from "../../types/data-transfer-objects/workflows/CreateFlowNode.dto";

class WorkflowsService {
  private workflowModel = workflowModel;
  private flowNodeModel = flowNodeModel;

  public createWorkflow = async (workflowData: CreateWorkflowDTO, user: User) => {
    return await this.workflowModel.create({
      userID: user._id,
      ...workflowData,
      nodes: []
    });
  }

  public getWorkflow = async (id: Types.ObjectId) => {
    return this.workflowModel.find({_id: id});
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

  public createFlowNode = async (flowNode: CreateFlowNodeDTO) => {
    // todo, implement this
    return await this.flowNodeModel.create(flowNode);
  }

  public insertFlowNode = async (workflowId:Types.ObjectId, flownodeId:Types.ObjectId) => {
    // const node = await this.flowNodeModel.insert({})
    // const workflow = await this.workflowModel.findOne({"_id": workflowID})
    // let nodes = workflow.nodes;
    // const updatedWorkflow = new WorkflowDTO(workflow);
    // this.workflowModel.updateOne(workflow,)

  }
}

export default WorkflowsService;
