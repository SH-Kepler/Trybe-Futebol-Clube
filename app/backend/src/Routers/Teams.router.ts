import { Router } from 'express';
import TeamsController from '../controllers/Teams.controller';

const router = Router();

router.get('/', TeamsController.getAllTeams);
router.get('/:id', TeamsController.getTeam);

export default router;
