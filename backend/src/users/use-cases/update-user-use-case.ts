import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { hash } from 'bcrypt';

@Injectable()
class UpdateUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(id: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.usersService.findOneById(id);

    if (!userExists) {
      throw new HttpException('Usário não encontrado!', 404);
    }

    if (updateUserDto.email) {
      const emailIsAlreadyInUse = await this.usersService.findOneByEmail(
        updateUserDto.email,
      );

      if (emailIsAlreadyInUse && emailIsAlreadyInUse.id !== id) {
        throw new HttpException('Esse email já está sendo utilizado!', 400);
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await hash(updateUserDto.password, 12);
    }

    return await this.usersService.update(id, updateUserDto);
  }
}

export { UpdateUserUseCase };
