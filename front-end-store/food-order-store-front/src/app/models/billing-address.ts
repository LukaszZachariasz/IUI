import {Order} from './order';

export class BillingAddress {
  public id: number;
  public billingName: string;
  public billingCity: string;
  public billingStreet: string;
  public billingHouseNr: string;
  public billingApartmentNr: string;
  public billingZipCode: string;
  public order: Order;
}
