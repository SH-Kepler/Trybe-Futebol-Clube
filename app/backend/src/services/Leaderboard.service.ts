import { ITeams } from '../interfaces';
import GetHomeTeamStatistics from '../utils/Leaderboard/getHomeTeamStatistics.Leaderboard';
import TeamsService from './Teams.service';

export default class LeaderboardService {
  static async getHomeTeamLeaderboard() {
    const teams = await TeamsService.getAllTeams();

    const team = await Promise.all(teams.message
      .map(async (t: ITeams) => GetHomeTeamStatistics.allStatistics(t)));

    const sortTeams = await Promise.all(GetHomeTeamStatistics.sortTeams(team));

    return { status: 200, teams: sortTeams };
  }
}
