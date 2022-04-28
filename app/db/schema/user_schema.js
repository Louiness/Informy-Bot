import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  nickname: { type: String, required: true },
  discriminator: { type: Number, required: true },
});

export const UserModel = mongoose.model('User', userSchema);
