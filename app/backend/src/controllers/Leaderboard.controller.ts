import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  static async getHomeTeamLeaderboard(req: Request, res:Response) {
    const { status, teams } = await LeaderboardService.getTeamLeaderboard('home');

    return res.status(status).json(teams);
  }

  static async getAwayTeamLeaderboard(req: Request, res:Response) {
    const { status, teams } = await LeaderboardService.getTeamLeaderboard('away');

    return res.status(status).json(teams);
  }
}
