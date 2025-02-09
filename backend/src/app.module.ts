import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
//   controllers: [AppController],
  providers: [ AuthService, JwtService],
})
export class AppModule {}
