import { model, Schema, Types } from 'mongoose';

interface Activity {
  user: Types.ObjectId;
  type: 'run' | 'cycle' | 'swim' | 'strength' | 'walk';
  durationMinutes: number;
  distanceKm?: number;
  calories: number;
  date: Date;
}

const activitySchema: Schema<Activity> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['run', 'cycle', 'swim', 'strength', 'walk'],
      required: true,
    },
    durationMinutes: { type: Number, min: 1, required: true },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, min: 0, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true },
);

export const activity = model('Activity', activitySchema);
