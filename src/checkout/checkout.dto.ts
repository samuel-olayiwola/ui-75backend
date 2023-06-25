import { ApiProperty } from '@nestjs/swagger';

export class CheckoutDto {
  @ApiProperty()
  amount: number;
  @ApiProperty()
  customerId: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;z
  @ApiProperty()
  email: string;
  
}
