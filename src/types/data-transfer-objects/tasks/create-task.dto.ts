import {IsString} from "class-validator";


export default class CreateTaskDTO {

    constructor() {}

    @IsString()
    public title!: string;

    @IsString()
    public description!: string;
}
