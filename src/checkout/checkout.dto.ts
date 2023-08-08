import { ApiProperty } from '@nestjs/swagger';

export class CheckoutDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string; 

  @ApiProperty()
  email: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  narration: string;

  @ApiProperty()
  hallOfResidence:string; 

  @ApiProperty()
  transactionID: string
}
export class PaystackResponseDto{
  @ApiProperty()
  status: boolean;

  @ApiProperty()
  message: string; 

  @ApiProperty()
  data: object;
}

export class CheckoutResponseDto  {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string; 
  @ApiProperty()
  email: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  narration: string;
  @ApiProperty()
  hallOfResidence: string;
  @ApiProperty()
  transactionID: string;
  @ApiProperty()
  status: string
  @ApiProperty()
  date: Date
}

export class CheckoutByHallDto {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string; 
  @ApiProperty()
  email: string;
  @ApiProperty()
  amount: number;
  narration: string;
  @ApiProperty()
  transactionID: string;
  @ApiProperty()
  status: string
  @ApiProperty()
  date: Date
}

export class CheckoutHallDto  {
  @ApiProperty()
  hallName: string;
  @ApiProperty({type:[CheckoutByHallDto]})
  data: CheckoutByHallDto[]
}