import * as https from "https"
import lodash from "lodash"
import { PaystackEvents } from "./paystack.events";
import { HttpException, Injectable } from "@nestjs/common";
import { CheckoutDto, PaystackResponseDto } from "src/checkout/checkout.dto";
import { CheckoutService } from "src/checkout/checkout.service";



@Injectable()
export class PaystackService {
  private secretKey = process.env.PAYSTACK_SECRET_KEY;
  constructor(private readonly checkoutService: CheckoutService){}
  async initializeTransaction(
    email: string,
    amount: number,
    details: CheckoutDto,
    callback:(input: PaystackResponseDto) => void
  ): Promise<void> {
    
    const params = JSON.stringify({
      email,
      amount
    });

    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        "Content-Type": "application/json",
      },
    };


    const paystackReq = https
      .request(options, (paystackRes) => {
        let data = "";

        paystackRes.on("data", (chunk) => {
          data += chunk;
        });

        paystackRes.on("end", async () => {
          let response = JSON.parse(data);
          console.log(response)
          callback(response)
          if(response.status){
            await this.checkoutService.saveTransaction(details)
          }
        });
      })
      .on("error", (error) => {
        console.error(error);
      });
    paystackReq.write(params);
    paystackReq.end();
    
  }

  async handlePaystackWebhook(event: any): Promise<void>{
    switch (event.event) {
      case PaystackEvents.ChargeSuccess:
        const data = lodash.at(event.data, [
          "reference",
          "amount",
          "metadata.narration",
        ]);

        const [reference, amount, narration] = data;

        break;
      default:
        throw new HttpException(
          `No Handler Specified for Paystack Event ${event}`, 500
        );
    }
  }

  async verifyTransaction(
    ref: string,
    successCallback: (data: any) => void,
    errorCallback: (message: string, statusCode: number) => void
  ): Promise<void> {
    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: `/transaction/verify/${encodeURIComponent(ref)}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
      },
    };

    const paystackReq = https.request(options, (paystackRes) => {
        let data = "";
        paystackRes.on("data", (chunk) => {
          data += chunk;
        });
        paystackRes.on("end", () => {
          let response = JSON.parse(data);
          if (response.status === true) {
            successCallback(response);
          } else {
            if (response.message == "Transaction reference not found") {
              errorCallback(response.message, 404);
            } else {
              errorCallback(response.message, 500);
            }
          }
        });
      })
      .on("error", (error) => {
        console.error(error);
      });
    paystackReq.end();
  }
}