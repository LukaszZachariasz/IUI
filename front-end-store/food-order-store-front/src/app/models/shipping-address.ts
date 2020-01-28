import {Order} from './order';

export class ShippingAddress {
  public id: number;
  public shippingName: string;
  public shippingStreet: string;
  public shippingCity: string;
  public shippingZipCode: string;
  public shippingHouseNr: string;
  public shippingApartmentNr: string;
  public shippingDefault: boolean;
  public order: Order;
}
