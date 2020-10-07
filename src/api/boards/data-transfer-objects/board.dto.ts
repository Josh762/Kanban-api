
import { IsString } from 'class-validator';
import board from '../interfaces/board.interface';
import {Types} from "mongoose";

export default class BoardDTO {

    constructor(b:board) {
        this.title = b.title;
        this.project = b.projectId;
        this.workFlowId = b.workflow
    }

    @IsString()
    public title!: string;

    // @IsString()
    public project!: Types.ObjectId;

    // @IsString()
    public workFlowId!: Types.ObjectId; // todo revisit this?
}
