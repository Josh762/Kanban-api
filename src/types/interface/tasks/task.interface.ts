import {Types} from "mongoose";

interface Task {
    _id: Types.ObjectId;
    title: string;
    description: string;
    to?: [Types.ObjectId]; // todo, used to add buttons to task for custom move actions.. ie failed test, move to todo
}

export default Task;
