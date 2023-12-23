import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from 'src/types/create-user.dto';
import { Payload } from 'src/types/payload.interface';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService, private readonly prismaService: PrismaService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      return user;
    }

    return null;
  }

  async refreshToken(user: any) {
    const payload = {
      name: user.name,
      sub: user.id
    }

    return {
      access_token: this.createAccessToken(payload),
    }
  }

  async login(user: any) {
    const payload = {
      name: user.name,
      sub: user.id
    }

    return {
      access_token: this.createAccessToken(payload),
      refresh_token: this.createRefreshToken(payload)
    }
  }

  async register(data: CreateUserDto) {
    const userExist = await this.prismaService.user.findFirst({ where: { email: data.email }});

    if (userExist) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const salt = Number(process.env.SALT);

    data.password = await bcrypt.hash(data.password, salt);

    const user = await this.prismaService.user.create({
      data
    });

    const payload = {
      name: user.name,
      sub: user.id
    }

    return {
      access_token: this.createAccessToken(payload),
      refresh_token: this.createRefreshToken(payload)
    }
  }

  createAccessToken(payload: Payload) {
    return this.jwtService.sign(payload);
  }

  createRefreshToken(payload: Payload) {
    return this.jwtService.sign(payload, {expiresIn: '7d'})
  }
}
