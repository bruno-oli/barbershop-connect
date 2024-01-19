import { Injectable } from '@nestjs/common';
import { CreateBarberDto } from '../dto/create-barber.dto';
import { UpdateBarberDto } from '../dto/update-barber.dto';
import { Barber } from '../entities/barber.entity';
import { BarberRefreshToken } from '../entities/barber-refresh-token.entity';

@Injectable()
abstract class BarberRepository {
  abstract create(barber: CreateBarberDto): Promise<void>;
  abstract update(id: string, barber: UpdateBarberDto): Promise<void>;
  abstract findOneById(id: string): Promise<Barber | null>;
  abstract findOneByEmail(email: string): Promise<Barber | null>;
  abstract delete(id: string): Promise<void>;
  abstract createRefreshToken(barberId: string): Promise<BarberRefreshToken>;
  abstract validateRefreshToken(
    refreshToken: string,
  ): Promise<BarberRefreshToken | null>;
  abstract deleteRefreshToken(refreshToken: string): Promise<void>;
}

export { BarberRepository };
