import {BillingAddress} from './billing-address';


export class PaymentOrder {
  public id: number;
  public type: string;
  public cardName: string;
  public cardNumber: string;
  public cvc: string;
  public defaultPayment: boolean;
  public billingAddress: BillingAddress;
}
