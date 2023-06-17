import { Body, Controller, Get, Post } from '@nestjs/common';
import { CheckoutDetails } from './checkout.entity';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './checkout.dto';

@Controller('checkout')
export class CheckoutController{
    constructor(private readonly remitaCheckoutService: CheckoutService) {}

    @Post()
    async createCheckoutPayment(@Body() checkoutDto:CheckoutDto): Promise<any> {
      const { Amount,Name} = checkoutDto;
    return this.remitaCheckoutService.makePayment(Amount,Name);
  }
}
