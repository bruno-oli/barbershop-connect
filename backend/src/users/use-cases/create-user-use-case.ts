import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
class CreateUserUseCase {
  constructor(private readonly usersService: UsersService) {
    this.usersService = usersService;
  }

  async execute(createUserDto: CreateUserDto) {
    try {
      const userExists = await this.usersService.findOneByEmail(
        createUserDto.email,
      );

      if (userExists) {
        throw new HttpException('Esse email já está sendo utilizado!', 400);
      }

      const hashedPassword = await hash(createUserDto.password, 12);

      createUserDto.password = hashedPassword;

      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (!(error instanceof HttpException)) {
        console.log(error);

        throw new HttpException('Erro interno no servidor', 500);
      }

      throw error;
    }
  }
}

export { CreateUserUseCase };
