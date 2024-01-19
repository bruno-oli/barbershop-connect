import { Injectable } from '@nestjs/common';
import { CreateBarberDto } from './dto/create-barber.dto';
import { UpdateBarberDto } from './dto/update-barber.dto';
import { BarberRepository } from './repositories/barber.repository';

@Injectable()
export class BarbersService {
  constructor(private readonly barberRepository: BarberRepository) {}

  async create(createBarberDto: CreateBarberDto) {
    await this.barberRepository.create(createBarberDto);
  }

  async update(id: string, updateBarberDto: UpdateBarberDto) {
    await this.barberRepository.update(id, updateBarberDto);
  }

  async findOneById(id: string) {
    return await this.barberRepository.findOneById(id);
  }

  async findOneByEmail(email: string) {
    return await this.barberRepository.findOneByEmail(email);
  }

  async delete(id: string) {
    return await this.barberRepository.delete(id);
  }

  async createRefreshToken(barberId: string) {
    return await this.barberRepository.createRefreshToken(barberId);
  }

  async validateRefreshToken(refreshToken: string) {
    return await this.barberRepository.validateRefreshToken(refreshToken);
  }

  async deleteRefreshToken(refreshToken: string) {
    return await this.barberRepository.deleteRefreshToken(refreshToken);
  }
}
