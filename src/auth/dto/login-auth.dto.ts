import { IsString, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  @IsNotEmpty({ message: 'Логин не указан' })
  login: string;

  @IsString()
  @IsNotEmpty({ message: 'Пароль не указан' })
  password: string;
}
