import * as https from "https"
import lodash from "lodash"
import { PaystackEvents } from "./paystack.events";
import { HttpException, Injectable } from "@nestjs/common";

type InitTransCallbackParams = {
  access_code: string;
  reference: string;
  authorization_url: string
};


@Injectable()
export class PaystackService {
  private secretKey = process.env.PAYSTACK_SECRET_KEY;

  async initializeTransaction(
    email: string,
    amount: number,
    narration: string,
    callback:(input: InitTransCallbackParams) => void
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
          if (response.status === true) {
            const { reference, access_code, authorization_url } = response.data;
            callback({access_code, reference, authorization_url})
          } else {
            throw new HttpException("Transaction could not be initiated", 500);
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