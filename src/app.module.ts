import { Module } from '@nestjs/common';
import { CheckoutModule } from './checkout/checkout.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { CheckoutController } from './checkout/checkout.controller';
import { CheckoutService } from './checkout/checkout.service';
@Module({
  imports: [
    TypeOrmModule.forRoot(
     configService.getTypeOrmConfig(), 
    )
  ,CheckoutModule],
  controllers: [CheckoutController],
  providers: [CheckoutService],
 
})
export class AppModule {}
