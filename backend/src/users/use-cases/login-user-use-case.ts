import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
class LoginUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new HttpException('Email ou senha inválidos!', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new HttpException('Email ou senha inválidos!', 401);
    }

    const tokenExpiresIn = '1h';
    const token = sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: tokenExpiresIn },
    );

    const refreshToken = await this.usersService.createRefreshToken(user.id);

    return { token, refreshToken };
  }
}

export { LoginUserUseCase };
