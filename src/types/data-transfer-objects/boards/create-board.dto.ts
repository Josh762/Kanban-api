
import { IsString } from 'class-validator';
import board from '../../interface/boards/board.interface';
import {Types} from "mongoose";

export default class CreateBoardDTO {



    constructor() {

    }

    @IsString()
    public title!: string;

    // @IsString()
    // public project!: Types.ObjectId;

    @IsString()
    public workflowId!: string; // todo revisit this?
}
