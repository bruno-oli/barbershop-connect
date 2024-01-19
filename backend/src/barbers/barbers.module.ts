import { Module } from '@nestjs/common';
import { BarbersService } from './barbers.service';
import { BarbersController } from './barbers.controller';
import { PrismaService } from 'src/database/prisma.service';
import { BarberRepository } from './repositories/barber.repository';
import { DatabaseBarberRepository } from './repositories/database/database-barber.repository';
import { CreateBarberUseCase } from './use-cases/create-barber-use-case';
import { UpdateBarberUseCase } from './use-cases/update-barber-use-case';
import { DeleteBarberUseCase } from './use-cases/delete-barber-use-case';
import { GetBarberByIdUseCase } from './use-cases/get-barber-by-id-use-case';
import { LoginBarberUseCase } from './use-cases/login-barber-use-case';
import { BarberRefreshTokenUseCase } from './use-cases/barber-refresh-token-use-case';

@Module({
  controllers: [BarbersController],
  providers: [
    BarbersService,
    PrismaService,
    {
      provide: BarberRepository,
      useClass: DatabaseBarberRepository,
    },
    CreateBarberUseCase,
    UpdateBarberUseCase,
    DeleteBarberUseCase,
    GetBarberByIdUseCase,
    LoginBarberUseCase,
    BarberRefreshTokenUseCase,
  ],
})
export class BarbersModule {}
