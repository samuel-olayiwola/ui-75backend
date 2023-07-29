export const PaystackEvents = {
  ChargeDisputedCreate: 'charge.dispute.create', //A dispute was logged against your business
  ChargeDisputeRemind: 'charge.dispute.remind', // A logged dispute has not been resolved
  ChargeDisputeResolve: 'charge.dispute.resolve', // A dispute has been resolved
  ChargeSuccess: 'charge.success', // A successful charge was made
  CustomerIndentificationFailed: 'customeridentification.failed', // A customer ID validation has failed
  CustomerIdentificationSuccess: 'customeridentification.success', //	A customer ID validation was successful
  InvoiceCreate: 'invoice.create', //	An invoice has been created for a subscription on your account. This usually happens 3 days before the subscription is due or whenever we send the customer their first pending invoice notification
  InvoicePaymentFailed: 'invoice.payment_failed', //	A payment for an invoice failed
  InvoiceUpdate: 'invoice.update', // An invoice has been updated.  This usually means we were able to charge the customer successfully. You should inspect the invoice object returned and take necessary action
  PaymentRequestPending: 'paymentrequest.pending', //	A payment request has been sent to a customer
  PaymentRequestSuccess: 'paymentrequest.success', // A payment request has been paid for
  TransferFailed: 'transfer.failed', // A transfer you attempted has failed
  TransferSuccess: 'transfer.success', //	A successful transfer has been completed
  TransferReversed: 'transfer.reversed', // A transfer you attempted has been reversed
};
