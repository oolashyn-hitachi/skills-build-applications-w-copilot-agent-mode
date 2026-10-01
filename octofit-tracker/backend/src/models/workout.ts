import { model, Schema } from 'mongoose';

interface Workout {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  targetAreas: string[];
}

const workoutSchema: Schema<Workout> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, min: 1, required: true },
    targetAreas: { type: [String], required: true },
  },
  { timestamps: true },
);

export const workout = model('Workout', workoutSchema);
