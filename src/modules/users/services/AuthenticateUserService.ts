import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { User } from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { IJWTProvider } from '../providers/JWTProvider/models/IJWTProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('JWTProvider')
    private JWTProvider: IJWTProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user)
      throw new AppError('Incorrect email and password combination.', 401);

    const passwordMatches = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatches)
      throw new AppError('Incorrect email and password combination.', 401);

    const token = await this.JWTProvider.generate(user.id);

    return {
      user,
      token,
    };
  }
}

export { AuthenticateUserService };
