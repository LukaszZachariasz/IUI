import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {CartService} from '../../services/cart.service';
import {Food} from '../../models/food';
import {CartItem} from '../../models/cart-item';
import {ShoppingCart} from '../../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  private displayedColumns: string[] = ['item', 'cost', 'quantity', 'action'];

  private selectedFood: Food;
  private cartItemList: CartItem[] = [];
  private cartItemNumber: number;
  private shoppingCart: ShoppingCart = new ShoppingCart();
  private cartItemUpdated: boolean;
  private emptyCart: boolean;
  private notEnoughStock: boolean;
  private fetchedList = true;

  constructor(private userService: UserService,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.getCartItemList();
    this.getShoppingCart();
  }

  onRemoveCartItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem.id).subscribe(
      res => {
        console.log(res);
        this.getCartItemList();
        this.getShoppingCart();
      }, error => {
        console.log(error);
      }
    );
  }

  onUpdateCartItem(cartItem: CartItem) {
    this.cartService.updateCartItem(cartItem.id, cartItem.qty).subscribe(
      res => {
        console.log(res);
        this.cartItemUpdated = true;
        cartItem.toUpdate = false;
        this.getShoppingCart();
      }, error => {
        console.log(error);
      }
    );
  }

  getCartItemList() {
    this.cartService.getCartItemList().subscribe(
      res => {
        console.log(res);
        this.cartItemList = JSON.parse(res);
        this.cartItemNumber = this.cartItemList.length;
      }, error => {
        console.log(error);
      }
    );
  }

  getShoppingCart() {
    this.cartService.getShoppingCart().subscribe(
      res => {
        console.log(res);
        this.shoppingCart = JSON.parse(res);
      }, error => {
        console.log(error);
      }
    );
  }

  getTotalCost() {
    return this.shoppingCart.grandTotal;
  }

  getTotalQty() {
    let summary = 0;
    for (let item of this.cartItemList) {
      summary += item.qty;
    }
    return summary;
  }
}
