import mongoose, {Types} from 'mongoose';
import Board from '../../types/interface/boards/board.interface';


const boardSchema = new mongoose.Schema({
  owner: mongoose.Schema.Types.ObjectId,
  assignee: mongoose.Schema.Types.ObjectId,
  title: mongoose.Schema.Types.String,
  // projectId: mongoose.Schema.Types.ObjectId, // todo, future?
  workflow: {
    ref: 'Workflow',
    type: mongoose.Schema.Types.ObjectId
  }
})

const boardModel = mongoose.model<Board & mongoose.Document>('Board', boardSchema)


export default boardModel;
