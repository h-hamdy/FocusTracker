import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SetDeadlineDto } from './dto/set-deadline.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/SetDeadline')
  @UseGuards(JwtAuthGuard)
  async setDeadline(@Body() data: SetDeadlineDto, @Req() request: Request) {
    const userId = (request as any).user.sub;
    return this.userService.setDeadline(userId, data.endDate);
  }

  @Get('/getDeadline')
  @UseGuards(JwtAuthGuard)
  async GetDeadline(@Req() request: Request) {
    const userId = (request as any).user.sub;
    return this.userService.getDeadline(userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() request: Request) {
    const userId = (request as any).user.sub;

    if (!userId) {
      throw new UnauthorizedException('User not found in token');
    }

    return this.userService.getUser(userId);
  }
}
