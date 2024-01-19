import { Injectable } from '@nestjs/common';
import { BarberRepository } from '../barber.repository';
import { CreateBarberDto } from 'src/barbers/dto/create-barber.dto';
import { UpdateBarberDto } from 'src/barbers/dto/update-barber.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
class DatabaseBarberRepository implements BarberRepository {
  constructor(private readonly prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(barber: CreateBarberDto) {
    await this.prisma.barber.create({
      data: barber,
    });
  }

  async update(id: string, barber: UpdateBarberDto) {
    await this.prisma.barber.update({
      where: {
        id,
      },
      data: barber,
    });
  }

  async findOneById(id: string) {
    return await this.prisma.barber.findUnique({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.barber.findUnique({ where: { email } });
  }

  async delete(id: string) {
    await this.prisma.barber.delete({ where: { id } });
  }

  async createRefreshToken(barberId: string) {
    const expiresIn = dayjs().add(7, 'day').unix();

    return await this.prisma.barberRefreshToken.create({
      data: {
        barberId,
        expiresIn,
      },
    });
  }

  async validateRefreshToken(refreshToken: string) {
    const barberRefreshTokenExists =
      await this.prisma.barberRefreshToken.findFirst({
        where: {
          id: refreshToken,
        },
      });

    return barberRefreshTokenExists;
  }

  async deleteRefreshToken(refreshToken: string) {
    await this.prisma.barberRefreshToken.delete({
      where: {
        id: refreshToken,
      },
    });
  }
}

export { DatabaseBarberRepository };
