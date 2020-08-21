import {Types} from "mongoose";


interface FlowNode {
  _id: Types.ObjectId;
  to: [Types.ObjectId]
}

export default FlowNode;
