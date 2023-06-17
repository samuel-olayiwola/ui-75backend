import { ApiProperty } from '@nestjs/swagger';

export class CheckoutDto {
  @ApiProperty()
  Amount: number;
  @ApiProperty()
  Name:string;
}
