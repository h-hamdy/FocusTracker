import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDtoSignin, AuthDtoSignup } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(@Body() dto: AuthDtoSignup) {
    const existingUser = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    // If a user with the provided username already exists, throw an error
    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists.');
    }

    // generate the hash password
    if (dto.password != dto.confirmationPassword)
      throw new UnauthorizedException('Passwords do not match.');

    const hash = await argon.hash(dto.password);

    // save the new user in the database
    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        hash,
      },
      select: {
        id: true,
        username: true,
      },
    });

    // return the user
    return user;
  }

  async signin(@Body() dto: AuthDtoSignin) {

    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

	console.log(user)

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordMatch = await argon.verify(user.hash, dto.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const payload = { sub: user.id, username: user.username };
    return {
		access_token: this.jwtService.sign(payload),
	  };
  }
}
