import { Body, Controller, Get, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CheckoutDetails } from './checkout.entity';
import { CheckoutService } from './checkout.service';

@Controller('checkout')
export class CheckoutController{
    constructor(private readonly remitaCheckoutService: CheckoutService) {}

    @Post()
    async createCheckoutPayment(@Body() payload: any): Promise<any> {
    return this.remitaCheckoutService.makePayment(payload);
  }
}
