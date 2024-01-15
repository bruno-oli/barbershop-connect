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
import { LoginUserDTO } from './dto/login-user-dto';
import { LoginUserUseCase } from './use-cases/login-user-use-case';
import { UserRefreshTokenDTO } from './dto/user-refresh-token.dto';
import { UserRefreshTokenUseCase } from './use-cases/user-refresh-token-use-case';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly userRefreshTokenUseCase: UserRefreshTokenUseCase,
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
  async delete(@Param('id') id: string) {
    await this.deleteUserUseCase.execute(id);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return await this.getUserUseCase.execute(id);
  }

  // Authenticate Routes
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDTO) {
    return await this.loginUserUseCase.execute(
      loginUserDto.email,
      loginUserDto.password,
    );
  }

  @Post('refresh-token')
  async refreshToken(@Body() userRefreshTokenDto: UserRefreshTokenDTO) {
    return this.userRefreshTokenUseCase.execute(
      userRefreshTokenDto.refresh_token,
    );
  }
}
