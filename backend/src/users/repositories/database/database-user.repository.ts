import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
class DatabaseUserRepositoty implements UserRepository {
  constructor(private readonly prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(user: CreateUserDto) {
    await this.prisma.user.create({
      data: user,
    });
  }

  async update(id: string, user: UpdateUserDto) {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: user,
    });
  }

  async findOneById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async delete(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

export { DatabaseUserRepositoty };