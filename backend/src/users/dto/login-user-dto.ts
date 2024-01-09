import { IsEmail, IsString, MinLength } from 'class-validator';

class LoginUserDTO {
  @IsEmail({}, { message: 'Email inválido!' })
  email: string;

  @IsString({ message: 'Senha inválida!' })
  @MinLength(1, { message: 'Senha inválida!' })
  password: string;
}

export { LoginUserDTO };
