import {IsEnum, IsString} from "class-validator";
import workflowType from "./workFlowType.enum";



class CreateWorkflowDTO {
  // @IsEnum(workflowType)
  public type!: workflowType;
}

export default CreateWorkflowDTO;
