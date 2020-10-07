
import { IsString } from 'class-validator';
import board from '../../interface/boards/board.interface';
import {Types} from "mongoose";

export default class BoardDTO {

    constructor(b:board) {
        this._id = b._id;
        this.title = b.title;
        // this.project = b.projectId;
        this.workflowId = b.workflow
    }

    public _id!: Types.ObjectId | undefined;

    @IsString()
    public title!: string;

    // @IsString()
    // public project!: Types.ObjectId;

    // @IsString()
    public workflowId!: Types.ObjectId; // todo revisit this?
}
