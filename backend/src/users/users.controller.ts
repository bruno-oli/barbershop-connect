import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './use-cases/create-user-use-case';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserUseCase } from './use-cases/update-user-use-case';
import { DeleteUserUseCase } from './use-cases/delete-user-use-case';
import { GetUserUseCase } from './use-cases/get-user-use-case';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.createUserUseCase.execute(createUserDto);

    return {
      message: 'Usário criado com sucesso!',
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.updateUserUseCase.execute(id, updateUserDto);
  }

  @Delete(':id')
  async deelete(@Param('id') id: string) {
    await this.deleteUserUseCase.execute(id);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return await this.getUserUseCase.execute(id);
  }
}
