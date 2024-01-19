import { IsString } from 'class-validator';

class BarberRereshTokenDTO {
  @IsString()
  refreshToken: string;
}

export { BarberRereshTokenDTO };
