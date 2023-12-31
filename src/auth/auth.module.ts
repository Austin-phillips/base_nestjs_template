import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { PrismaService } from 'prisma/prisma.service';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '5m' }
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy, PrismaService, RefreshJwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
