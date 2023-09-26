import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { FirebaseAuth } from 'src/types/firebase-auth.interface';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getUser({email, userId}: FirebaseAuth): Promise<Users> {
        const user = await this.prisma.users.findFirst({
            where: {
                email,
                firebaseId: userId
            }
        });

        if (user) {
            return user;
        } else {
            return await this.prisma.users.create({
                data: {
                    email,
                    firebaseId: userId
                }
            })
        }
    }
}
