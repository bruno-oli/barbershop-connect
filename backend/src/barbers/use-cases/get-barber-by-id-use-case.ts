import { HttpException, Injectable } from '@nestjs/common';
import { BarbersService } from '../barbers.service';

@Injectable()
class GetBarberByIdUseCase {
  constructor(private readonly barbersService: BarbersService) {}

  async execute(id: string) {
    try {
      const user = await this.barbersService.findOneById(id);

      if (!user) {
        throw new HttpException('Barbeiro não encontrado!', 404);
      }

      return user;
    } catch (error) {
      if (!(error instanceof HttpException)) {
        console.log(error);

        throw new HttpException('Erro interno no servidor', 500);
      }

      throw error;
    }
  }
}

export { GetBarberByIdUseCase };
