import { Router } from 'express';
import { user } from '../models/user';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await user.find().populate('team').sort({ username: 1 }));
});

router.post('/', async (request, response) => {
  const createdUser = await user.create(request.body);
  response.status(201).json(createdUser);
});

export default router;
