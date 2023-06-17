import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CheckoutDetails } from './checkout.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class CheckoutService{
    constructor(
        @InjectRepository(CheckoutDetails)
        private readonly checkoutRepository: Repository<CheckoutDetails>,
      ) {}

      async makePayment(data: any): Promise<any> {
        try {

          const response = await axios.post('https://remita-checkout-url', data);
          return response.data;
        } catch (error) {
            
          throw new Error('Error making Remita checkout request');

        }
    }
}