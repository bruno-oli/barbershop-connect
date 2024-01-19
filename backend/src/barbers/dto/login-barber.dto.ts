import { IsEmail, MinLength } from 'class-validator';

export class LoginBarberDTO {
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @MinLength(1, { message: 'Senha inválida' })
  password: string;
}
