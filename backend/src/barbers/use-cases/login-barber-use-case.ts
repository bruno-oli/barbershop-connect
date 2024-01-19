import { HttpException, Injectable } from '@nestjs/common';
import { BarbersService } from '../barbers.service';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
class LoginBarberUseCase {
  constructor(private readonly barbersService: BarbersService) {}

  async execute(email: string, password: string) {
    try {
      const barberExists = await this.barbersService.findOneByEmail(email);

      if (!barberExists) {
        throw new HttpException('Email ou senha inválidos!', 401);
      }

      const passwordMatch = await compare(password, barberExists.password);

      if (!passwordMatch) {
        throw new HttpException('Email ou senha inválidos!', 401);
      }

      const tokenExpiresIn = '1h';
      const token = sign(
        {
          id: barberExists.id,
          email: barberExists.email,
          name: barberExists.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: tokenExpiresIn },
      );

      const refreshToken = await this.barbersService.createRefreshToken(
        barberExists.id,
      );

      return { token, refreshToken };
    } catch (error) {
      if (!(error instanceof HttpException)) {
        console.log(error);

        throw new HttpException('Erro interno no servidor', 500);
      }

      throw error;
    }
  }
}

export { LoginBarberUseCase };
