import { Router } from 'express';
import { team } from '../models/team';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await team.find().populate('members createdBy').sort({ name: 1 }));
});

router.post('/', async (request, response) => {
  const createdTeam = await team.create(request.body);
  response.status(201).json(createdTeam);
});

export default router;
