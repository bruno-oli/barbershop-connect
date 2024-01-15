import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { sign } from 'jsonwebtoken';
import * as dayjs from 'dayjs';

@Injectable()
class UserRefreshTokenUseCase {
  constructor(private readonly usersService: UsersService) {
    this.usersService = usersService;
  }

  async execute(refreshToken: string) {
    const refreshTokenExists =
      await this.usersService.validateRefreshToken(refreshToken);

    if (!refreshTokenExists) {
      throw new HttpException('Refresh token inválido!', 401);
    }

    const refreshTokenIsExpired = dayjs().isAfter(
      dayjs.unix(refreshTokenExists.expiresIn),
    );

    const user = await this.usersService.findOneById(refreshTokenExists.userId);

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

    if (refreshTokenIsExpired) {
      await this.usersService.deleteRefreshToken(refreshTokenExists.id);

      const newRefreshToken = await this.usersService.createRefreshToken(
        refreshTokenExists.userId,
      );

      return {
        token,
        refreshToken: newRefreshToken,
      };
    }

    return {
      token,
    };
  }
}

export { UserRefreshTokenUseCase };
