import { Request, Response, NextFunction } from 'express';
import HttpException from '../shared/HttpException';
import JWT from './jwtAuthentication';

const jwt = new JWT();

export default class ValidateToken {
  authorization = async (req: Request, _res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new HttpException(401, 'Token not found');
    }

    try {
      const payload = jwt.tokenAuthorization(authorization);
      req.body.user = payload;
      next();
    } catch (error) {
      throw new HttpException(401, 'Token must be a valid token');
    }
  };
}
