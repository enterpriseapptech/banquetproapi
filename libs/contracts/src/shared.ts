import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class DataWithCountDto<T> {
  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  @IsNumber()
  count: number;

  @ApiProperty({ example: "Platinum" })
  @IsNotEmpty()
  data: T[];

}