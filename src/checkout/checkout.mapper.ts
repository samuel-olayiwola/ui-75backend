import { CheckoutDetails } from "./checkout.entity"
import { CheckoutResponseDto, CheckoutHallDto, CheckoutByHallDto } from "./checkout.dto"

export function mapToResponse(details: CheckoutDetails): CheckoutResponseDto{
    const response: CheckoutResponseDto = {
        firstName: details.firstName,
        lastName: details.lastName, 
        email: details.email,
        amount: details.amount,
        narration: details.narration,
        hallOfResidence: details.hallOfResidence,
        transactionID: details.transactionID,
        status: details.status,
        date: details.date
    }

    return response
}

export function groupByHallOfResidence(
    checkoutResponses: CheckoutResponseDto[]
  ): CheckoutHallDto[] {
    const groupedResponses: { [key: string]: CheckoutByHallDto[] } = {};
  
    for (const response of checkoutResponses) {
      const { hallOfResidence, ...data } = response;
      if (groupedResponses[hallOfResidence]) {
        groupedResponses[hallOfResidence].push(data);
      } else {
        groupedResponses[hallOfResidence] = [data];
      }
    }
  
    const checkoutList: CheckoutHallDto[] = [];
    for (const hallName in groupedResponses) {
      if (Object.prototype.hasOwnProperty.call(groupedResponses, hallName)) {
        checkoutList.push({ hallName, data: groupedResponses[hallName] });
      }
    }
  
    return checkoutList;
  }