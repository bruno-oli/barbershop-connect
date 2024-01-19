import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { CreateBarberDto } from './dto/create-barber.dto';
import { CreateBarberUseCase } from './use-cases/create-barber-use-case';
import { UpdateBarberDto } from './dto/update-barber.dto';
import { UpdateBarberUseCase } from './use-cases/update-barber-use-case';
import { DeleteBarberUseCase } from './use-cases/delete-barber-use-case';
import { GetBarberByIdUseCase } from './use-cases/get-barber-by-id-use-case';
import { LoginBarberUseCase } from './use-cases/login-barber-use-case';
import { LoginBarberDTO } from './dto/login-barber.dto';
import { BarberRefreshTokenUseCase } from './use-cases/barber-refresh-token-use-case';
import { BarberRereshTokenDTO } from 'src/barbers/dto/refresh-token.dto';

@Controller('barbers')
export class BarbersController {
  constructor(
    private readonly createrBarberUseCase: CreateBarberUseCase,
    private readonly updateBarberUseCase: UpdateBarberUseCase,
    private readonly deleteBarberUseCase: DeleteBarberUseCase,
    private readonly getBarberUseCase: GetBarberByIdUseCase,
    private readonly loginBarberUseCase: LoginBarberUseCase,
    private readonly barberRereshTokenUseCase: BarberRefreshTokenUseCase,
  ) {}

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.getBarberUseCase.execute(id);
  }

  @Post()
  create(@Body() createBarberDto: CreateBarberDto) {
    return this.createrBarberUseCase.execute(createBarberDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBarberDto: UpdateBarberDto) {
    return this.updateBarberUseCase.execute(id, updateBarberDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteBarberUseCase.execute(id);
  }

  // Auth
  @Post('/login')
  login(@Body() loginBarberDto: LoginBarberDTO) {
    return this.loginBarberUseCase.execute(
      loginBarberDto.email,
      loginBarberDto.password,
    );
  }

  @Post('/refresh-token')
  refreshToken(@Body() barberRefreshTokenDto: BarberRereshTokenDTO) {
    return this.barberRereshTokenUseCase.execute(
      barberRefreshTokenDto.refreshToken,
    );
  }
}
