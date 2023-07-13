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

export type CheckoutResponseDto = {
  firstName: string;
  lastName: string; 
  email: string;
  amount: number;
  narration: string;
  hallOfResidence: string;
  transactionID: string;
  status: string,
  date: Date
}

export type CheckoutByHallDto = {
  firstName: string;
  lastName: string; 
  email: string;
  amount: number;
  narration: string;
  transactionID: string;
  status: string,
  date: Date
}

export type CheckoutHallDto = {
  hallName: string;
  data: CheckoutByHallDto[]
}