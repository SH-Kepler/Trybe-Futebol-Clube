import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    const { status, message } = await MatchesService
      .getAllMatches(inProgress as string | undefined);

    return res.status(status).json(message);
  }

  static async createNewMatch(req: Request, res: Response) {
    const { body } = req;

    const { status, message } = await MatchesService.createNewMatch(body);

    return res.status(status).json((await message).dataValues);
  }
}
