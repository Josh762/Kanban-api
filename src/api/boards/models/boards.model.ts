import mongoose, {Types} from 'mongoose';
import Board from '../interfaces/board.interface';


const boardSchema = new mongoose.Schema({
  ownerId: mongoose.Schema.Types.ObjectId,
  columns: [
    {
      ref: 'Column',
      type: mongoose.Schema.Types.ObjectId
    }
  ]
})

const boardModel = mongoose.model<Board & mongoose.Document>('Board', boardSchema)
