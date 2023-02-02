import { NextFunction, Request, Response } from 'express';
import { emailOrPasswordRequired } from '../utils/messages';
import { ILogin } from '../interfaces';

export default class UserMiddlware {
  emptyEmailOrPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: ILogin = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: emailOrPasswordRequired });
    }

    next();
  };
}
