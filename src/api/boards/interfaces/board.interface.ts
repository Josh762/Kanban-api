import {Types} from "mongoose";


interface Board {
  _id?: Types.ObjectId;
  owner: Types.ObjectId;
  title: string;
  // projectId?: Types.ObjectId; // todo, future
  workflow: Types.ObjectId; // todo this should be required when workflows are implemented
}

export default Board;
