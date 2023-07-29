import { Controller, Post, Get, Req, Body, Res, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { CheckoutResponseDto } from "src/checkout/checkout.dto";
import { PaystackService } from "./paystack.service";


@Controller('transaction')
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) { }

  @Post('initialize')
  async intializeTx(
    @Body() dto: CheckoutResponseDto,
    @Req() req: Request,
    @Res() res: Response ) {
    
    const { email, amount, narration } = req.body;
    if (!email || !narration) {
      throw new HttpException("email and narration required", 400);
    }

      this.paystackService.initializeTransaction(
        email,
        amount * 100,
        narration,
        ({ access_code, authorization_url }) => {
          res.status(200).json({
            access_code, 
            authorization_url,
            amount,
          })
        }
      );
  }


  @Get('verify')
  findall(): string {
    return 'Hello'
  }

}

// @Post()
//   initialize_tx(// put the dto here //) {
//     // Get The current user and get the customerID, first_name, last_name, email
//     // Get the request payload and get the amount, narration [only positive integer amount/decimal]
//     let paystack_service = new PaystackService();
//     let response = paystack_service.initializeTransaction().then()