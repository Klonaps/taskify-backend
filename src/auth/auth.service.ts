import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService, private configService: ConfigService) {}

  async login(loginDto: LoginAuthDto) {
    const candidate = await this.userService.findByLogin(loginDto.login);
    if (!candidate) throw new BadRequestException('Неправильный логин или пароль');
    const isPasswordValide = await bcrypt.compare(loginDto.password, candidate.hash);
    if (!isPasswordValide) throw new BadRequestException('Неправильный логин или пароль');
    const accessToken = await this.generateAccessToken(candidate.id, candidate.login);
    return {
      user: {
        id: candidate.id,
        login: candidate.login,
      },
      accessToken,
    };
  }

  async register(registerDto: RegisterAuthDto) {
    const isCandidateExists = await this.userService.findByLogin(registerDto.login);
    if (isCandidateExists) throw new BadRequestException('Пользователь с таким логином уже существует');
    const saltRound = Number(this.configService.get<string>('SALTROUNDS'));
    const salt = bcrypt.genSaltSync(saltRound);
    const hash = bcrypt.hashSync(registerDto.password, salt);

    const newUser = await this.userService.create({ login: registerDto.login, hash });
    const accessToken = await this.generateAccessToken(newUser.id, newUser.login);

    return {
      user: newUser,
      accessToken,
    };
  }

  private async generateAccessToken(id: number, login: string) {
    return await this.jwtService.signAsync(
      {
        id,
        login,
      },
      {
        secret: this.configService.get<string>('JWT_AT_SECRET'),
        expiresIn: '1d',
      },
    );
  }
}
