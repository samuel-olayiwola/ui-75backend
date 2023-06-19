import { ApiProperty } from '@nestjs/swagger';

export class CheckoutDto {
  @ApiProperty()
  amount: number;
  @ApiProperty()
  name: string;
}
