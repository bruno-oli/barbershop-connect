import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
class DeleteUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(id: string) {
    const userExists = await this.usersService.findOneById(id);

    if (!userExists) {
      throw new HttpException('Usário não encontrado!', 404);
    }

    return await this.usersService.delete(id);
  }
}

export { DeleteUserUseCase };
