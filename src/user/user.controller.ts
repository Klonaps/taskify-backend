import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findOne(@Req() req: Request) {
    if (!req.user) throw new UnauthorizedException('Пользователь не аутентифицирован');
    const user = req.user;
    return this.userService.findOne(user.id);
  }
}
