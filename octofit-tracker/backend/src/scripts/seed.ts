import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { activity } from '../models/activity';
import { leaderboard } from '../models/leaderboard';
import { team } from '../models/team';
import { user } from '../models/user';
import { workout } from '../models/workout';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    await connectDatabase();

    await activity.deleteMany({});
    await leaderboard.deleteMany({});
    await team.deleteMany({});
    await workout.deleteMany({});
    await user.deleteMany({});

    const users = await user.create([
      { username: 'alex.runner', email: 'alex@example.com', fullName: 'Alex Rivera' },
      { username: 'jordan.moves', email: 'jordan@example.com', fullName: 'Jordan Lee' },
      { username: 'sam.strides', email: 'sam@example.com', fullName: 'Sam Patel' },
    ]);

    const teams = await team.create([
      {
        name: 'Trail Blazers',
        description: 'A team focused on running and outdoor adventures.',
        members: [users[0]._id, users[1]._id],
        createdBy: users[0]._id,
      },
      {
        name: 'Morning Movers',
        description: 'Building a consistent, active start to every day.',
        members: [users[2]._id],
        createdBy: users[2]._id,
      },
    ]);

    await user.updateOne({ _id: users[0]._id }, { team: teams[0]._id });
    await user.updateOne({ _id: users[1]._id }, { team: teams[0]._id });
    await user.updateOne({ _id: users[2]._id }, { team: teams[1]._id });

    await activity.create([
      {
        user: users[0]._id,
        type: 'run',
        durationMinutes: 32,
        distanceKm: 5.2,
        calories: 360,
        date: new Date('2026-09-27T08:00:00Z'),
      },
      {
        user: users[1]._id,
        type: 'cycle',
        durationMinutes: 45,
        distanceKm: 14,
        calories: 410,
        date: new Date('2026-09-28T07:30:00Z'),
      },
      {
        user: users[2]._id,
        type: 'strength',
        durationMinutes: 40,
        calories: 280,
        date: new Date('2026-09-29T06:45:00Z'),
      },
    ]);

    await leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 320, rank: 1, period: 'weekly' },
      { user: users[1]._id, team: teams[0]._id, points: 275, rank: 2, period: 'weekly' },
      { user: users[2]._id, team: teams[1]._id, points: 240, rank: 3, period: 'weekly' },
    ]);

    await workout.create([
      {
        title: 'Steady 5K Builder',
        description: 'A comfortable-paced run to build aerobic endurance.',
        difficulty: 'beginner',
        durationMinutes: 30,
        targetAreas: ['cardio', 'legs'],
      },
      {
        title: 'Full Body Strength',
        description: 'A balanced circuit using bodyweight movements.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        targetAreas: ['core', 'upper body', 'legs'],
      },
      {
        title: 'Recovery Ride',
        description: 'An easy spin to support recovery between hard sessions.',
        difficulty: 'beginner',
        durationMinutes: 25,
        targetAreas: ['cardio', 'legs'],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
