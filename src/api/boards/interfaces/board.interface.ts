import {Types} from "mongoose";


interface Board {
  _id: Types.ObjectId;
  ownerId: Types.ObjectId;
  columns: [Types.ObjectId];
}

export default Board;
