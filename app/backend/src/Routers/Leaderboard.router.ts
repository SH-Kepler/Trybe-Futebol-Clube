import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const router = Router();

router.get('/home', LeaderboardController.getHomeTeamLeaderboard);

export default router;
