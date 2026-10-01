import { Router } from 'express';
import { workout } from '../models/workout';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await workout.find().sort({ title: 1 }));
});

router.post('/', async (request, response) => {
  const createdWorkout = await workout.create(request.body);
  response.status(201).json(createdWorkout);
});

export default router;
