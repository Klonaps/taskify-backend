import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    console.log('Database connect success');
    await this.$connect();
  }

  async onModuleDestroy() {
    console.log('Database disconnect');
    await this.$disconnect();
  }
}
