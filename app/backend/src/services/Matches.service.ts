import { IMatch } from '../interfaces';
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
}
