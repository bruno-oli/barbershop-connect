import { IsString } from 'class-validator';

class UserRefreshTokenDTO {
  @IsString()
  refresh_token: string;
}

export { UserRefreshTokenDTO };
