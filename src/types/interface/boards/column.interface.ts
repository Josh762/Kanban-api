import {Types} from "mongoose";


interface column {
  _id: Types.ObjectId;
  ownerId: Types.ObjectId;
  columns: [Types.ObjectId];
}

export default column;
