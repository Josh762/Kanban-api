import {IsArray, IsString} from "class-validator";
import {Types} from "mongoose";


export default class CreateFlowNodeDTO {

    public status!: Types.ObjectId;

    @IsArray()
    public tasks!: Types.ObjectId[];

    @IsArray()
    public to!: Types.ObjectId[];

}
