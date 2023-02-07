import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  static async getAllMatches(req: Request, res: Response) {
    const { status, message } = await MatchesService.getAllMatches();

    return res.status(status).json(message);
  }
}
