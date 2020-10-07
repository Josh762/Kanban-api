import {Types} from 'mongoose';

interface Card {
  _id: Types.ObjectId;
  title: string;
  description: string;
}

export default Card;
