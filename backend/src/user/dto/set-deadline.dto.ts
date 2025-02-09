import { IsDateString } from "class-validator";

export class SetDeadlineDto {
  @IsDateString()
  endDate: string;
}
