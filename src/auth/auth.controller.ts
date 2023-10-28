import { Controller, Post, Body, HttpCode, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import { Public } from 'src/common/decorators/is-public.decorator';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Get('verify')
  verifyToken(@Req() req: Request) {
    return this.authService.verifyToken(req.user);
  }

  @Public()
  @HttpCode(200)
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Public()
  @Post('register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }
}
