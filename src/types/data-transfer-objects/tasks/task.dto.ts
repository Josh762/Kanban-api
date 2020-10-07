import {IsString} from "class-validator";


export default class TaskDTO {

    constructor() {}

    @IsString()
    public _id!: string;

    @IsString()
    public title!: string;

    @IsString()
    public description!: string;
}
