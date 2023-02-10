import { IMatch, ITeamsId } from '../interfaces';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class MatchesService {
  static async getAllMatches(inProgress: string | undefined) {
    let where;
    if (inProgress) {
      where = inProgress === 'true' ? { inProgress: true } : { inProgress: false };
    }
    const matches = await Matches.findAll({
      where,
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return { status: 200, message: matches };
  }

  static async createNewMatch(match: IMatch) {
    const newMatch = Matches.create({ ...match, inProgress: true });

    return { status: 201, message: newMatch };
  }

  static async updateMatch(id: string) {
    const match = await Matches.update({ inProgress: false }, { where: { id } });

    return { status: 200, message: 'Finished', match };
  }

  static async updateMatchInProgress(id: string, teamsId: ITeamsId) {
    const match = await Matches.findByPk(id);

    if (match) {
      match.homeTeamGoals = teamsId.homeTeamGoals;
      match.awayTeamGoals = teamsId.awayTeamGoals;

      await match.save();
    }

    return { status: 200, match };
  }
}
