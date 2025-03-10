import { Injectable } from '@nestjs/common';
import { CheckoutDetails } from './checkout.entity';
import { CheckoutDto, CheckoutHallDto, CheckoutResponseDto } from './checkout.dto';
import { groupByHallOfResidence, mapToResponse } from './checkout.mapper';


@Injectable()
export class CheckoutService{

    async saveTransaction(dto: CheckoutDto): Promise<CheckoutResponseDto>{
        const details = await CheckoutDetails.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            amount: dto.amount,
            narration: dto.narration,
            hallOfResidence: dto.hallOfResidence,
            transactionID: dto.transactionID,
            status: Status.PENDING.toString(),
            date: new Date()
        }).save();
    
        return mapToResponse(details)
    }

    async getAllTransactions(): Promise<CheckoutHallDto[]>{
        const details = await CheckoutDetails.find();
        const responses = details.map((detail) => mapToResponse(detail));
        return groupByHallOfResidence(responses);
    }
    
      /*async makePayment(): Promise<any> {
          // let payload = {

          //   key: "QzAwMDAyNzEyNTl8MTEwNjE4NjF8OWZjOWYwNmMyZDk3MDRhYWM3YThiOThlNTNjZTE3ZjYxOTY5NDdmZWE1YzU3NDc0ZjE2ZDZjNTg1YWYxNWY3NWM4ZjMzNzZhNjNhZWZlOWQwNmJhNTFkMjIxYTRiMjYzZDkzNGQ3NTUxNDIxYWNlOGY4ZWEyODY3ZjlhNGUwYTY=", // enter your key here
          //   customerId: data.customerId,
          //   firstName: data.firstName,
          //   lastName: data.lastName,
          //   email: data.email,
          //   amount: data.amount,
          //   narration: "UI@75",
            
          //   onSuccess: function (response) {
          //     // function callback when payment is successful
          //     console.log("callback Successful Response", response);
          //   },
          //   onError: function (response) {
          //     // function callback when payment fails
          //     console.log("callback Error Response", response);
          //   },
          //   onClose: function () {
          //     // function callback when payment modal is closed
          //     console.log("closed");
          //   },

            
          // };
          //return payload
          //const response = await axios.post('', payload);
          //return response.data;


          const htmlform =  `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <title> Remita - Inline Sample</title>
              <style type="text/css">
                  .form-style-1 {
                      margin: 10px auto;
                      max-width: 400px;
                      padding: 20px 12px 10px 20px;
                      font: 13px "Lucida Sans Unicode", "Lucida Grande", sans-serif;
                  }
          
                  .form-style-1 li {
                      padding: 0;
                      display: block;
                      list-style: none;
                      margin: 10px 0 0 0;
                  }
          
                  .form-style-1 label {
                      margin: 0 0 3px 0;
                      padding: 0px;
                      display: block;
                      font-weight: bold;
                  }
          
                  .form-style-1 input[type=text],
                  .form-style-1 input[type=date],
                  .form-style-1 input[type=datetime],
                  .form-style-1 input[type=number],
                  .form-style-1 input[type=search],
                  .form-style-1 input[type=time],
                  .form-style-1 input[type=url],
                  .form-style-1 input[type=email],
                  textarea,
                  select {
                      box-sizing: border-box;
                      -webkit-box-sizing: border-box;
                      -moz-box-sizing: border-box;
                      border: 1px solid #BEBEBE;
                      padding: 7px;
                      margin: 0px;
                      -webkit-transition: all 0.30s ease-in-out;
                      -moz-transition: all 0.30s ease-in-out;
                      -ms-transition: all 0.30s ease-in-out;
                      -o-transition: all 0.30s ease-in-out;
                      outline: none;
                  }
          
                  .form-style-1 input[type=text]:focus,
                  .form-style-1 input[type=date]:focus,
                  .form-style-1 input[type=datetime]:focus,
                  .form-style-1 input[type=number]:focus,
                  .form-style-1 input[type=search]:focus,
                  .form-style-1 input[type=time]:focus,
                  .form-style-1 input[type=url]:focus,
                  .form-style-1 input[type=email]:focus,
                  .form-style-1 textarea:focus,
                  .form-style-1 select:focus {
                      -moz-box-shadow: 0 0 8px #88D5E9;
                      -webkit-box-shadow: 0 0 8px #88D5E9;
                      box-shadow: 0 0 8px #88D5E9;
                      border: 1px solid #88D5E9;
                  }
          
                  .form-style-1 .field-divided {
                      width: 49%;
                  }
          
                  .form-style-1 .field-long {
                      width: 100%;
                  }
          
                  .form-style-1 .field-select {
                      width: 100%;
                  }
          
                  .form-style-1 .field-textarea {
                      height: 100px;
                  }
          
                  .form-style-1 input[type=submit], .form-style-1 input[type=button] {
                      background: #f44336;
                      padding: 8px 15px 8px 15px;
                      border: none;
                      color: #fff;
                  }
          
                  .form-style-1 input[type=submit]:hover, .form-style-1 input[type=button]:hover {
                      background: #e0372b;
                      box-shadow: none;
                      -moz-box-shadow: none;
                      -webkit-box-shadow: none;
                  }
          
                  .form-style-1 .required {
                      color: red;
                  }
              </style>
          </head>
          <body>
          <form onsubmit="makePayment()" id="payment-form">
              <ul class="form-style-1">
                  <li>
                      <label>First Name <span class="required">*</span></label>
                      <input type="text" id="js-firstName" name="firstName" class="field-divided" placeholder="First name"/>
                  </li>

                  <li>
                    <label>First Name <span class="required">*</span></label>
                      <input type="text" id="js-lastName" name="lastName" class="field-divided" placeholder="Last name"/>
                      
                    
                  </li>
                  <li>
                      <label>Email <span class="required">*</span></label>
                      <input type="email" id="js-email" name="email" placeholder="something@domain.com" class="field-long"/>
                  </li>
                  <li>
                      <label>Narration <span class="required">*</span></label>
                      <input type="text" id="js-narration" name="narration" placeholder="narration" class="field-long"/>
                  </li>
                  <li>
                      <label>Amount <span class="required">*</span></label>
                      <input type="number" id="js-amount" name="amount" placeholder="amount" class="field-long"/>
                  </li>
                  
                  <li>
                    <label for="search">Select an option:</label>
                    <input type="text" id="search" list="choices" name="choice" placeholder="Type to search">
                    <datalist id="choices">
                        <option value="Kenneth Mellanby">
                        <option value="Lord Tedder">
                        <option value="Nnamdi Azikwe">
                        <option value="Independence">
                        <option value="Queen Elizabeth II">
                        <option value="Sultan Bello Hall">
                        <option value="Ransome Kuti">
                        <option value="Queen Idia">
                        <option value="Obafemi Awolowo">
                        <option value="Alexander Brown">
                        <option value="Ahmadu Bello">
                        <option value="Tafawa Balewa">
                    </datalist>
                  </li>
                  <li>
                      <input type="button" onclick="makePayment()" value="Pay"/>
                  
                    
                </li>
              </ul>
          </form>
          
          <script>
            //   function setDemoData() {
            //       var obj = {
            //           firstName: "Mike",
            //           lastName: "Oshadami",
            //           email: "oshadami@specs.com",
            //           narration: "Test Payment",
            //           amount: "19999"
            //       };
            //       for (var propName in obj) {
            //           document.querySelector('#js-' + propName).setAttribute('value', obj[propName]);
            //       }
            //   }
          
              function makePayment() {
                  var form = document.querySelector("#payment-form");
                  var paymentEngine = RmPaymentEngine.init({
                      key: 'REVNT05UR0lGVHw0MDgyNTIxNHwxZTI1NGNlNTVhMzkyYTgxYjYyNjQ2ZWIwNWU0YWE4ZTNjOTU0ZWFlODllZGEwMTUwMjYyMTk2ZmFmOGMzNWE5ZGVjYmU3Y2JkOGI5ZWI5YzFmZWMwYTI3MGI5MzA0N2FjZWEzZDhiZjUwNDY5YjVjOGY3M2NhYjQzMTg3NzI4Mg==',
                      customerId: form.querySelector('input[name="email"]').value,
                      firstName: form.querySelector('input[name="firstName"]').value,
                      lastName: form.querySelector('input[name="lastName"]').value,
                      email: form.querySelector('input[name="email"]').value,
                      amount: form.querySelector('input[name="amount"]').value,
                      narration: form.querySelector('input[name="narration"]').value,
                      onSuccess: function (response) {
                          console.log('callback Successful Response', response);
                      },
                      onError: function (response) {
                          console.log('callback Error Response', response);
                      },
                      onClose: function () {
                          console.log("closed");
                      }
                  });
                   paymentEngine.showPaymentWidget();
              }
          
            //   window.onload = function () {
            //       setDemoData();
            //   };
          </script>
          <script type="text/javascript" src="https://remitademo.net/payment/v1/remita-pay-inline.bundle.js"></script>
          </body>
          </html>`
                     return htmlform;
        }*/ 

        
}