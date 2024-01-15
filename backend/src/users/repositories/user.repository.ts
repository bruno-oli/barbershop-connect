import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserRefreshToken } from '../entities/user-refresh-token.entity';

@Injectable()
abstract class UserRepository {
  abstract create(user: CreateUserDto): Promise<void>;
  abstract update(id: string, user: UpdateUserDto): Promise<void>;
  abstract findOneById(id: string): Promise<User | null>;
  abstract findOneByEmail(email: string): Promise<User | null>;
  abstract delete(id: string): Promise<void>;
  abstract createRefreshToken(userId: string): Promise<UserRefreshToken>;
  abstract validateRefreshToken(
    refreshToken: string,
  ): Promise<UserRefreshToken>;
  abstract deleteRefreshToken(refreshToken: string): Promise<void>;
}

export { UserRepository };
