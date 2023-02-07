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
}
