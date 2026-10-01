import { model, Schema, Types } from 'mongoose';

interface User {
  username: string;
  email: string;
  fullName: string;
  team?: Types.ObjectId;
}

const userSchema: Schema<User> = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

export const user = model('User', userSchema);
