import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExecutionContext, CanActivate } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService,) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = (request as any).cookies?.jwt?.access_token;

    if (!token) {
		throw new UnauthorizedException('No token provided');
	  }
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      (request as any ).user = payload;
      return true;
    } catch {
		throw new UnauthorizedException('Invalid token');
    }
  }
}
