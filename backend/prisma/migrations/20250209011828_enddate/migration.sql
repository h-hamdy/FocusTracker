-- AlterTable
ALTER TABLE "User" ADD COLUMN     "longBreakInterval" INTEGER DEFAULT 4,
ADD COLUMN     "longBreakTime" INTEGER DEFAULT 15,
ADD COLUMN     "pomodoroTime" INTEGER DEFAULT 25,
ADD COLUMN     "shortBreakTime" INTEGER DEFAULT 5;
