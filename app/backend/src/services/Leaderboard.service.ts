import { ITeams } from '../interfaces';
import GetTeamStatistics from '../utils/Leaderboard/getHomeTeamStatistics.Leaderboard';
import TeamsService from './Teams.service';

export default class LeaderboardService {
  static async getTeamLeaderboard(param: 'home' | 'away') {
    const teams = await TeamsService.getAllTeams();

    const team = await Promise.all(teams.message
      .map(async (t: ITeams) => GetTeamStatistics.allStatistics(t, param)));

    const sortTeams = await Promise.all(GetTeamStatistics.sortTeams(team));

    return { status: 200, teams: sortTeams };
  }
}
