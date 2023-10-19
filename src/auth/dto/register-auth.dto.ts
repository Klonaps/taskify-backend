import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  @IsNotEmpty({ message: 'Логин не указан' })
  login: string;

  @IsString()
  @IsNotEmpty({ message: 'Пароль не указан' })
  password: string;
}
