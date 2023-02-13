import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const router = Router();

router.get('/home', LeaderboardController.getHomeTeamLeaderboard);
router.get('/away', LeaderboardController.getAwayTeamLeaderboard);

export default router;
