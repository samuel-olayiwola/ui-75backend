import { Body, Controller, Get, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutDto, CheckoutHallDto, CheckoutResponseDto } from './checkout.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('checkout')
export class CheckoutController{
    constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'save donor details for remita',
    type: CheckoutResponseDto, // Specify the DTO class
  })
  saveTransaction(@Body() dto: CheckoutDto){
          return this.checkoutService.saveTransaction(dto)
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all transacrion',
    type: CheckoutHallDto, // Specify the DTO class
  })
  getAllTrasactions(){
    return this.checkoutService.getAllTransactions()
  }
}
