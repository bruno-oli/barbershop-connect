import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
abstract class UserRepository {
  abstract create(user: CreateUserDto): Promise<void>;
  abstract update(id: string, user: UpdateUserDto): Promise<void>;
  abstract findOneById(id: string): Promise<User | null>;
  abstract findOneByEmail(email: string): Promise<User | null>;
  abstract delete(id: string): Promise<void>;
}

export { UserRepository };
