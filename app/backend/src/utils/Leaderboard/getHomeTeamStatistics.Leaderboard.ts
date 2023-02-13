import Matches from '../../database/models/Matches';
import { ILeaderboard, IMatch, IPoints, ITeams } from '../../interfaces';

export default class GetTeamStatistics {
  static async allStatistics(team: ITeams, param: 'home' | 'away'): Promise<ILeaderboard> {
    const matches = await Matches
      .findAll({ where: { [`${param}TeamId`]: team.id, inProgress: false } });

    const points = matches.map(GetTeamStatistics.calculatePoints);

    const totalPoints = GetTeamStatistics.totalPoints(points, param);
    const totalGames = matches.length;
    const results = GetTeamStatistics.getResults(points, param);
    const goals = GetTeamStatistics.getGoals(matches, param);
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

  static totalPoints(points: IPoints[], param: 'home' | 'away') {
    return points.reduce((curr, acc) => curr + acc[`${param}TeamPoints`], 0);
  }

  static getResults(points: IPoints[], param: 'home' | 'away') {
    const away = param === 'home' ? 'away' : 'home';

    return {
      totalVictories: points.filter(({ win }) => win === param).length,
      totalDraws: points.filter(({ win }) => win === 'draw').length,
      totalLosses: points.filter(({ win }) => win === away).length,
    };
  }

  static getGoals(matches: IMatch[], param: 'home' | 'away') {
    const away = param === 'home' ? 'away' : 'home';
    const goalsFavor = matches.map((match) => match[`${param}TeamGoals`]).reduce((a, b) => a + b);
    const goalsOwn = matches.map((match) => match[`${away}TeamGoals`]).reduce((a, b) => a + b);
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
