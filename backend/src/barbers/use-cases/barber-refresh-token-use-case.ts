import { HttpException, Injectable } from '@nestjs/common';
import { BarbersService } from '../barbers.service';
import * as dayjs from 'dayjs';
import { sign } from 'jsonwebtoken';

@Injectable()
class BarberRefreshTokenUseCase {
  constructor(private readonly barbersService: BarbersService) {}

  async execute(refreshToken: string) {
    const refreshTokenExists =
      await this.barbersService.validateRefreshToken(refreshToken);

    if (!refreshTokenExists) {
      throw new HttpException('Refresh token inválido!', 401);
    }

    const refreshTokenIsExpired = dayjs().isAfter(
      dayjs.unix(refreshTokenExists.expiresIn),
    );

    const barber = await this.barbersService.findOneById(
      refreshTokenExists.barberId,
    );

    const tokenExpiresIn = '1h';
    const token = sign(
      {
        id: barber.id,
        email: barber.email,
        name: barber.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: tokenExpiresIn },
    );

    if (refreshTokenIsExpired) {
      await this.barbersService.deleteRefreshToken(refreshTokenExists.id);

      const newRefreshToken = await this.barbersService.createRefreshToken(
        refreshTokenExists.barberId,
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

export { BarberRefreshTokenUseCase };
