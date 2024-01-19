import { HttpException, Injectable } from '@nestjs/common';
import { BarbersService } from '../barbers.service';

@Injectable()
class DeleteBarberUseCase {
  constructor(private readonly barbersService: BarbersService) {}

  async execute(id: string) {
    try {
      const userExists = await this.barbersService.findOneById(id);

      if (!userExists) {
        throw new HttpException('Barbeiro não encontrado!', 404);
      }

      await this.barbersService.delete(id);
    } catch (error) {
      if (!(error instanceof HttpException)) {
        console.log(error);

        throw new HttpException('Erro interno no servidor', 500);
      }

      throw error;
    }
  }
}

export { DeleteBarberUseCase };
