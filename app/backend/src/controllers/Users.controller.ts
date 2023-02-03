import { Request, Response } from 'express';
import UsersService from '../services/Users.service';

export default class UsersControler {
  static async login(req: Request, res: Response) {
    const { body } = req;

    const { status, message } = await UsersService.login(body);

    return res.status(status).json(message);
  }
}
