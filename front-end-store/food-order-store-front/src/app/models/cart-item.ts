import {Food} from './food';
import {ShoppingCart} from './shopping-cart';

export class CartItem {
  public id: number;
  public subtotal: number;
  public food: Food;
  public shoppingCart: ShoppingCart;
  public toUpdate: boolean;
  public qty: number;
}
