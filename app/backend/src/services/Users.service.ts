import * as bcrypt from 'bcryptjs';
import { ILogin } from '../interfaces';
import Users from '../database/models/Users';
import HttpException from '../shared/HttpException';
import { emailOrPasswordIncorrect } from '../utils/messages';
import JWT from '../middlewares/jwtAuthentication';

const jwt = new JWT();

export default class UsersService {
  constructor(
    private _userModel = Users,
  ) {}

  async login(user: ILogin) {
    const { email, password } = user;

    const userExist = await this._userModel.findOne({ where: { email } });
    if (!userExist) {
      throw new HttpException(401, emailOrPasswordIncorrect);
    }

    const correctPassword = await bcrypt.compare(password, userExist.password);
    if (!correctPassword) {
      throw new HttpException(401, emailOrPasswordIncorrect);
    }

    return jwt.createToken(userExist);
  }
}
