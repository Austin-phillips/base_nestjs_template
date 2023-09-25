import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getHello(): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        id: 1
      }
    })
  }
}
