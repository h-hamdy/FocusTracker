import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async setDeadline(userId: number, endDate: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { endDate: new Date(endDate) },
    });
  }

  async getDeadline(userId: number) {
	const user = await this.prisma.user.findUnique({
	  where: { id: userId },
	  select: { endDate: true },
	});

	if (!user) {
	  throw new NotFoundException('User not found');
	}
	
	return user.endDate;
  }

  async getPomodoros(userId: number) {
	const user = await this.prisma.user.findUnique({
	  where: { id: userId },
	  select: {
		pomodoroTime: true,
		shortBreakTime: true,
		longBreakTime: true,
		longBreakInterval: true
	  }
	});
  
	if (!user) {
	  throw new Error("User not found");
	}
  
	return user;
  }



  async updatePomodoroTime(userId: number, time: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { pomodoroTime: time },
    });
  }

  async updateShortBreakTime(userId: number, time: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { shortBreakTime: time },
    });
  }

  async updateLongBreakTime(userId: number, time: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { longBreakTime: time },
    });
  }


  async getUser(id: number) {
	const user = await this.prisma.user.findUnique({
	  where: { id: id },
	});

		(user as any).hash = undefined;
  
	return user;
  }
}
