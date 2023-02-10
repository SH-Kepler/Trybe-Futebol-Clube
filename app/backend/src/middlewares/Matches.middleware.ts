import { NextFunction, Request, Response } from 'express';
import { equalTeams, teamNotFound } from '../utils/messages';
import { IMatch } from '../interfaces';
import Teams from '../database/models/Teams';

export default class MatchMiddleware {
  notEqualTeams = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeamId, awayTeamId }: IMatch = req.body;
    const homeTeamExists = await Teams.findByPk(homeTeamId);
    const awayTeamExists = await Teams.findByPk(awayTeamId);

    if (homeTeamId === awayTeamId) {
      return res.status(422).json({ message: equalTeams });
    }

    if (!homeTeamExists || !awayTeamExists) {
      return res.status(404).json({ message: teamNotFound });
    }

    next();
  };
}
