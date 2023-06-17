import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CheckoutDetails } from './checkout.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class CheckoutService{
    
      async makePayment(amount: number, Nmae:string): Promise<any> {
        try {
          const payload = {
            amount,
            name
          };
          const response = await axios.post('', payload);
          return response.data;
        } catch (error) {
            
          throw new Error('Error making Remita checkout request');

        }
    }
}