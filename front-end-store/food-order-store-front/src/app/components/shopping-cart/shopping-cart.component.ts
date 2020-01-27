import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {PaymentService} from '../../services/payment.service';
import {ShippingService} from '../../services/shipping.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {CartService} from '../../services/cart.service';
import {AppConst} from '../../constants/app-const';
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

  private imageServerPath = AppConst.imageServerPath;
  private serverPath = AppConst.serverPath;
  private extension = AppConst.extension;

  private selectedFood: Food;
  private cartItemList: CartItem[] = [];
  private cartItemNumber: number;
  private shoppingCart: ShoppingCart = new ShoppingCart();
  private cartItemUpdated: boolean;
  private emptyCart: boolean;
  private notEnoughStock: boolean;
  private fetchedList = true;

  constructor(private userService: UserService,
              private cartService: CartService,
              private paymentService: PaymentService,
              private shippingService: ShippingService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getCartItemList();
    this.getShoppingCart();
  }

  onSelect(food: Food) {
    this.selectedFood = food;
    this.router.navigate(['/foodDetail', this.selectedFood.id]);
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

  onCheckout() {
    if (this.cartItemNumber == 0) {
      this.emptyCart = true;
    } else {
      for (let item of this.cartItemList) {
        if (item.qty > 9) {
          this.notEnoughStock = true;
          return;
        }
      }

      this.router.navigate(['order']);
    }
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
