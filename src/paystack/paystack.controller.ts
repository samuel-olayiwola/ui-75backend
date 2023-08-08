import { Controller, Post, Get, Req, Body, Res, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { CheckoutDto, PaystackResponseDto } from "src/checkout/checkout.dto";
import { PaystackService } from "./paystack.service";
import { ApiResponse } from "@nestjs/swagger";


@Controller('transaction')
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) { }

  @Post('initialize')
  @ApiResponse({
    status: 200,
    description: 'Initialize a transacrion',
    type: PaystackResponseDto, // Specify the DTO class
  })
  async intializeTx(
    @Body() dto: CheckoutDto,
    @Req() req: Request,
    @Res() res: Response ) {
    
    const { email, amount, narration } = req.body;
    if (!email || !narration) {
      throw new HttpException("email and narration required", 400);
    }

      await this.paystackService.initializeTransaction(
        email,
        amount * 100,
        dto,
        (response) => {
          res.status(response.status? 200:400 ).json(response)
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