import { HttpException, Injectable } from '@nestjs/common';
import { BarbersService } from '../barbers.service';
import { UpdateBarberDto } from '../dto/update-barber.dto';
import { hash } from 'bcrypt';

@Injectable()
class UpdateBarberUseCase {
  constructor(private readonly barbersService: BarbersService) {}

  async execute(id: string, updateBarberDto: UpdateBarberDto) {
    try {
      const userExists = await this.barbersService.findOneById(id);

      if (!userExists) {
        throw new HttpException('Barbeiro não encontrado!', 404);
      }

      if (updateBarberDto.password) {
        updateBarberDto.password = await hash(updateBarberDto.password, 12);
      }

      return await this.barbersService.update(id, {
        email: updateBarberDto.email,
        name: updateBarberDto.name,
        gender: updateBarberDto.gender,
        password: updateBarberDto.password,
      });
    } catch (error) {
      if (!(error instanceof HttpException)) {
        console.log(error);

        throw new HttpException('Erro interno no servidor', 500);
      }

      throw error;
    }
  }
}

export { UpdateBarberUseCase };
