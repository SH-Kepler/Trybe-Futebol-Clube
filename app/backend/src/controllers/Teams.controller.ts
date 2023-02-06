import { Request, Response } from 'express';
import TeamsService from '../services/Teams.service';

export default class TeamsController {
  static async getAllTeams(req: Request, res:Response) {
    const { status, message } = await TeamsService.getAllTeams();

    return res.status(status).json(message);
  }
}
