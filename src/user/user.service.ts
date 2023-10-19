import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<Pick<User, 'login' | 'id'>> {
    const user = await this.databaseService.user.create({
      data: { ...createUserDto },
      select: {
        id: true,
        login: true,
      },
    });
    return user;
  }

  async findByLogin(login: string): Promise<User> {
    const user = this.databaseService.user.findFirst({ where: { login } });
    return user;
  }

  async findOne(id: number) {
    return await this.databaseService.user.findUnique({
      where: { id },
      select: {
        id: true,
        login: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAll() {
    return await this.databaseService.user.findMany({
      select: {
        id: true,
        login: true,
        createdAt: true,
      },
    });
  }
}
