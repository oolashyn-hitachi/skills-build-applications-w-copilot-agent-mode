import { Router } from 'express';
import { activity } from '../models/activity';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await activity.find().populate('user').sort({ date: -1 }));
});

router.post('/', async (request, response) => {
  const createdActivity = await activity.create(request.body);
  response.status(201).json(createdActivity);
});

export default router;
