import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from './repositories/user.repository';
import { DatabaseUserRepositoty } from './repositories/database/database-user.repository';
import { CreateUserUseCase } from './use-cases/create-user-use-case';
import { UpdateUserUseCase } from './use-cases/update-user-use-case';
import { DeleteUserUseCase } from './use-cases/delete-user-use-case';
import { GetUserUseCase } from './use-cases/get-user-use-case';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: DatabaseUserRepositoty,
    },
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUserUseCase,
  ],
})
export class UsersModule {}
