import { model, Schema, Types } from 'mongoose';

interface Team {
  name: string;
  description: string;
  members: Types.ObjectId[];
  createdBy: Types.ObjectId;
}

const teamSchema: Schema<Team> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const team = model('Team', teamSchema);
