import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  static async getHomeTeamLeaderboard(req: Request, res:Response) {
    const { status, teams } = await LeaderboardService.getHomeTeamLeaderboard();

    return res.status(status).json(teams);
  }
}
