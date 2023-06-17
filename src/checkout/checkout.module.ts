import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckoutDetails } from './checkout.entity';
import { configService } from 'src/config/config.service';


@Module({
  imports: [TypeOrmModule.forFeature([CheckoutDetails])],
  controllers: [CheckoutController],
  providers: [CheckoutService]
})
export class CheckoutModule {}
