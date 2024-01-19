import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

const genders = ['Masculino', 'Feminino'];

export class CreateBarberDto {
  @IsString()
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;

  @IsString()
  @IsEnum(genders, { message: 'Genero inválido' })
  gender: string;
}
