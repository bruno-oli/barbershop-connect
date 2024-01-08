import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async create(createUserDto: CreateUserDto) {
    await this.userRepository.create(createUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
  }

  async findOneById(id: string) {
    return await this.userRepository.findOneById(id);
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneByEmail(email);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}
