import mongoose from 'mongoose';
import User from '../../types/interface/users/user.interface';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String,
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
