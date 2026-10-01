import { Router } from 'express';
import { leaderboard } from '../models/leaderboard';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(
    await leaderboard
      .find()
      .populate('user team')
      .sort({ period: 1, rank: 1 }),
  );
});

router.post('/', async (request, response) => {
  const createdEntry = await leaderboard.create(request.body);
  response.status(201).json(createdEntry);
});

export default router;
