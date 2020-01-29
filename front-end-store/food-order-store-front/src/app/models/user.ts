import {UserPayment} from './user-payment';
import {UserShipping} from './user-shipping';

export class User {
  public id: number;
  public firstname: string;
  public lastname: string;
  public username: string;
  public password: string;
  public email: string;
  public enabled: boolean;
  public weight: number;
  public height: number;
  public phoneNumber: string;
  public dateOfBirth: string;
  public gender: string;
  public healthStatus: string;
  public bmi: number;
  public dailyTotalKcal: number;
  public userPaymentList: UserPayment[];
  public userShippingList: UserShipping[];
}
