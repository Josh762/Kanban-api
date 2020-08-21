
import {Types} from "mongoose";
import User from "../users/interfaces/user.interface";
import CreateWorkflowDTO from "./interfaces/createWorkflowDTO";
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
}

export default WorkflowsService;
