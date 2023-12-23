import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async getHello(): Promise<{ status: string, user: User }> {
    const user = await this.prisma.user.findFirst({ where: { id: 1 }});
    return {
      status: "Success",
      user
    };
  }
}
