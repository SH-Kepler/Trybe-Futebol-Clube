import Matches from '../../database/models/Matches';
import { ILeaderboard, IMatch, IPoints, ITeams } from '../../interfaces';

export default class GetHomeTeamStatistics {
  static async allStatistics(team: ITeams): Promise<ILeaderboard> {
    const matches = await Matches.findAll({
      where: { homeTeamId: team.id, inProgress: false },
    });

    const points = matches.map(GetHomeTeamStatistics.calculatePoints);

    const totalPoints = GetHomeTeamStatistics.totalPoints(points);
    const totalGames = matches.length;
    const results = GetHomeTeamStatistics.getResults(points);
    const goals = GetHomeTeamStatistics.getGoals(matches);
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

    return {
      name: team.teamName,
      totalPoints,
      totalGames,
      ...results,
      ...goals,
      efficiency };
  }

  static calculatePoints(match: IMatch) {
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals > awayTeamGoals) {
      return { homeTeamPoints: 3, awayTeamPoints: 0, win: 'home' };
    }
    if (awayTeamGoals > homeTeamGoals) {
      return { homeTeamPoints: 0, awayTeamPoints: 3, win: 'away' };
    }
    return { homeTeamPoints: 1, awayTeamPoints: 1, win: 'draw' };
  }

  static totalPoints(points: IPoints[]) {
    return points.reduce((curr, acc) => curr + acc.homeTeamPoints, 0);
  }

  static getResults(points: IPoints[]) {
    return {
      totalVictories: points.filter(({ win }) => win === 'home').length,
      totalDraws: points.filter(({ win }) => win === 'draw').length,
      totalLosses: points.filter(({ win }) => win === 'away').length,
    };
  }

  static getGoals(matches: IMatch[]) {
    const goalsFavor = matches.map(({ homeTeamGoals }) => homeTeamGoals).reduce((a, b) => a + b);
    const goalsOwn = matches.map(({ awayTeamGoals }) => awayTeamGoals).reduce((a, b) => a + b);
    const goalsBalance = goalsFavor - goalsOwn;

    return { goalsFavor, goalsOwn, goalsBalance };
  }

  static sortTeams(teams: ILeaderboard[]) {
    return teams.sort((a, b) =>
      b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn);
  }
}
