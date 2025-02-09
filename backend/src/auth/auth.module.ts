import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtAuthGuard],
	exports: [AuthService, JwtAuthGuard, JwtModule],
	imports: [
	  ConfigModule.forRoot(),
	  JwtModule.registerAsync({
		imports: [ConfigModule],
		useFactory: async (configService: ConfigService) => ({
		  secret: configService.get<string>("JWT_SECRET"),
		//   signOptions: { expiresIn: "60s" },
		}),
		inject: [ConfigService],
	  }),
	],
  })
  export class AuthModule {}
