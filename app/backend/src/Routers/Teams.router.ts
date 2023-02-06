import { Router } from 'express';
import TeamsController from '../controllers/Teams.controller';

const router = Router();

router.get('/', TeamsController.getAllTeams);

export default router;
