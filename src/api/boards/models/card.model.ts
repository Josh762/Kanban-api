import mongoose from "mongoose";
import Card from '../interfaces/card.interface';
const cardSchema = new mongoose.Schema({

  title: String,
  description: String
})

const cardModel = mongoose.model<Card & mongoose.Document>('Card', cardSchema);
