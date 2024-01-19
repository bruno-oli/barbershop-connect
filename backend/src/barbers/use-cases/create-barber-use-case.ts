import { HttpException, Injectable } from '@nestjs/common';
import { BarbersService } from '../barbers.service';
import { CreateBarberDto } from '../dto/create-barber.dto';
import { hash } from 'bcrypt';

@Injectable()
class CreateBarberUseCase {
  constructor(private barbersService: BarbersService) {}

  async execute({ email, password, name, gender }: CreateBarberDto) {
    try {
      const userExists = await this.barbersService.findOneByEmail(email);

      if (userExists) {
        throw new HttpException('Esse email já está sendo utilizado!', 400);
      }

      const hashedPassword = await hash(password, 12);

      password = hashedPassword;

      return await this.barbersService.create({
        email,
        password,
        name,
        gender,
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

export { CreateBarberUseCase };
