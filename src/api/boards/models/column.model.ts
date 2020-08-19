import mongoose from "mongoose";
import Column from '../interfaces/column.interface';

const columnSchema = new mongoose.Schema({
  cards: [
    {
      ref: 'Card',
      type: mongoose.Schema.Types.ObjectId
    }
  ]
})

const columnModel = mongoose.model<Column & mongoose.Document>('Column', columnSchema);
