import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';
import { CurrentUser } from '../auth/current-user.decorator';
import { FirebaseAuth } from 'src/types/firebase-auth.interface';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUser(@CurrentUser() firebaseAuth: FirebaseAuth) {
      return await this.usersService.getUser(firebaseAuth);
    }
}
