import { model, Schema, Types } from 'mongoose';

interface LeaderboardEntry {
  user: Types.ObjectId;
  team: Types.ObjectId;
  points: number;
  rank: number;
  period: 'weekly' | 'monthly' | 'all-time';
}

const leaderboardSchema: Schema<LeaderboardEntry> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, min: 0, required: true },
    rank: { type: Number, min: 1, required: true },
    period: {
      type: String,
      enum: ['weekly', 'monthly', 'all-time'],
      required: true,
    },
  },
  { timestamps: true },
);

leaderboardSchema.index({ period: 1, rank: 1 });

export const leaderboard = model('Leaderboard', leaderboardSchema);
