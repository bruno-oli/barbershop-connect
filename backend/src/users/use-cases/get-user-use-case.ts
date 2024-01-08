import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
class GetUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.usersService.findOneById(id);

    if (!user) {
      throw new HttpException('Usário não encontrado!', 404);
    }

    return user;
  }
}

export { GetUserUseCase };
