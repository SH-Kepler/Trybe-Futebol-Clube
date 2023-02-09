import { Request, Response } from 'express';
import UsersService from '../services/Users.service';

export default class UsersControler {
  static async login(req: Request, res: Response) {
    const { body } = req;

    const { status, message } = await UsersService.login(body);

    return res.status(status).json(message);
  }

  static async getRole(req: Request, res: Response) {
    const { email } = req.body.user.payload;

    const { status, role } = await UsersService.getRole(email);
    return res.status(status).json({ role });
  }
}
