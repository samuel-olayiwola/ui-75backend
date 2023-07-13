import { Body, Controller, Get, Post } from '@nestjs/common';
import { CheckoutDetails } from './checkout.entity';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './checkout.dto';

@Controller('checkout')
export class CheckoutController{
    constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  saveTransaction(@Body() dto: CheckoutDto){
          return this.checkoutService.saveTransaction(dto)
  }

  @Get()
  getAllTrasactions(){
    return this.checkoutService.getAllTransactions()
  }
}
