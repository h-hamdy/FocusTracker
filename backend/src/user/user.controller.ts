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

  @Get('/isAuthenticated')
  @UseGuards(JwtAuthGuard)
  isAuthenticated() {
    return true;
  }

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

  @Get('GetPomodoros')
  @UseGuards(JwtAuthGuard)
  async GetPormodoros(@Req() request: Request) {
	const userId = (request as any).user.sub;
	return this.userService.getPomodoros(userId);
  }


  @Post('updatePomodoroTime')
  @UseGuards(JwtAuthGuard)
  async updatePomodoroTime(@Req() request: Request, @Body('time') time: number) {
    const userId = (request as any).user.sub;
    return this.userService.updatePomodoroTime(userId, time);
  }


  @Post('updateShortBreakTime')
  @UseGuards(JwtAuthGuard)
  async updateShortBreakTime(@Req() request: Request, @Body('time') time: number) {
    const userId = (request as any).user.sub;
    return this.userService.updateShortBreakTime(userId, time);
  }

  @Post('updateLongBreakTime')
  @UseGuards(JwtAuthGuard)
  async updateLongBreakTime(@Req() request: Request, @Body('time') time: number) {
    const userId = (request as any).user.sub;
    return this.userService.updateLongBreakTime(userId, time);
  }



  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() request: Request) {
    const userId = (request as any).user.sub;

    if (!userId) {
      throw new UnauthorizedException('User not found in token');
    }

    return this.userService.getUser(userId)
  }
}
