import * as bcrypt from 'bcryptjs';
import { ILogin } from '../interfaces';
import Users from '../database/models/Users';
import HttpException from '../shared/HttpException';
import { emailOrPasswordIncorrect } from '../utils/messages';
import JWT from '../middlewares/jwtAuthentication';

const jwt = new JWT();

export default class UsersService {
  static async login(user: ILogin) {
    const { email, password } = user;

    const userExist = await Users.findOne({ where: { email } });
    if (!userExist) {
      throw new HttpException(401, emailOrPasswordIncorrect);
    }

    const correctPassword = await bcrypt.compare(password, userExist.password);
    if (!correctPassword) {
      throw new HttpException(401, emailOrPasswordIncorrect);
    }

    const token = jwt.createToken(user);
    return { status: 200, message: { token } };
  }

  static async getRole(email: string) {
    const user = await Users.findOne({ where: { email } });

    if (user) {
      return { status: 200, role: user.role };
    }

    throw new HttpException(401, 'Token not found');
  }
}
