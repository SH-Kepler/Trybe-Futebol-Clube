import { Request, Response } from 'express';
import UsersService from '../services/Users.service';

export default class UsersControler {
  constructor(
    private _usersService = new UsersService(),
  ) {}

  async login(req: Request, res: Response) {
    const { body } = req;

    const token = await this._usersService.login(body);

    return res.status(200).json({ token });
  }
}
