import { CheckoutDetails } from "./checkout.entity"
import { CheckoutResponseDto } from "./checkout.dto"

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