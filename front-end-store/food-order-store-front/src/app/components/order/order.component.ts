import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppConst} from '../../constants/app-const';
import {Food} from '../../models/food';
import {CartItem} from '../../models/cart-item';
import {ShoppingCart} from '../../models/shopping-cart';
import {ShippingAddress} from '../../models/shipping-address';
import {BillingAddress} from '../../models/billing-address';
import {UserPayment} from '../../models/user-payment';
import {UserShipping} from '../../models/user-shipping';
import {UserBilling} from '../../models/user-billing';
import {Order} from '../../models/order';
import {PaymentOrder} from '../../models/payment-order';
import {NavigationExtras, Router} from '@angular/router';
import {CartService} from '../../services/cart.service';
import {ShippingService} from '../../services/shipping.service';
import {PaymentService} from '../../services/payment.service';
import {CheckoutService} from '../../services/checkout.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private displayedColumns: string[] = ['item', 'cost', 'quantity'];


  private firstFormGroup: FormGroup;
  private secondFormGroup: FormGroup;
  private isEditable = false;

  private serverPath = AppConst.serverPath;
  private selectedFood: Food;
  private cartItemList: CartItem[] = [];
  private cartItemNumber: number;
  private shoppingCart: ShoppingCart = new ShoppingCart();
  private cartItemUpdated: boolean;
  private shippingAddress: ShippingAddress = new ShippingAddress();
  private billingAddress: BillingAddress = new BillingAddress();
  private userPayment: UserPayment = new UserPayment();
  private userShipping: UserShipping = new UserShipping();
  private userBilling: UserBilling = new UserBilling();
  private userShippingList: UserShipping[] = [];
  private userPaymentList: UserPayment[] = [];
  private payment: PaymentOrder = new PaymentOrder();
  private selectedTab: number;
  private emptyShippingList = true;
  private emptyPaymentList = true;
  private stateList: string[] = [];
  private shippingMethod: string;
  private order: Order = new Order();
  private isUserShippingFetching = true;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private cartService: CartService,
              private shippingService: ShippingService,
              private paymentService: PaymentService,
              private checkoutService: CheckoutService) {
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      // name: [this.shippingAddress ? this.shippingAddress.shippingName : '', Validators.required],
      // home: [this.shippingAddress ? this.shippingAddress.shippingHouseNr : '', Validators.required],
      // apartment: [this.shippingAddress ? this.shippingAddress.shippingApartmentNr : '', Validators.required],
      // street: [this.shippingAddress ? this.shippingAddress.shippingStreet : '', Validators.required],
      // city: [this.shippingAddress ? this.shippingAddress.shippingCity : '', Validators.required],
      // zipCode: [this.shippingAddress ? this.shippingAddress.shippingZipCode : '', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      // secondCtrl: ['', Validators.required]
    });

    this.getCartItemList();

    this.cartService.getShoppingCart().subscribe(
      res => {
        console.log(res);
        this.shoppingCart = JSON.parse(res);
      },
      error => {
        console.log(error);
      }
    );

    this.shippingService.getUserShippingList().subscribe(
      res => {
        this.isUserShippingFetching = true;
        console.log(res);
        this.userShippingList = JSON.parse(res);
        this.isUserShippingFetching = false;
        if (this.userShippingList.length) {
          this.emptyShippingList = false;

          for (const userShipping of this.userShippingList) {
            if (userShipping.userShippingDefault) {
              this.setShippingAddress(userShipping);
              return;
            }
          }
        }
      },
      error => {
        console.log(error.text());
      }
    );

    this.paymentService.getUserPaymentList().subscribe(
      res => {
        console.log(res);
        this.userPaymentList = JSON.parse(res);
        this.emptyPaymentList = false;

        if (this.userPaymentList.length) {
          this.emptyPaymentList = false;

          for (const userPayment of this.userPaymentList) {
            if (userPayment.defaultPayment) {
              this.setPaymentMethod(userPayment);
              return;
            }
          }
        }
      },
      error => {
        console.log(error.text());
      }
    );


    this.payment.type = '';
    this.shippingMethod = 'groundShipping';
  }

  setShippingAddress(userShipping: UserShipping) {
    if (userShipping) {
      this.shippingAddress.shippingCity = userShipping.userShippingCity;
      this.shippingAddress.shippingStreet = userShipping.userShippingStreet;
      this.shippingAddress.shippingHouseNr = userShipping.userShippingHouseNr;
      this.shippingAddress.shippingApartmentNr = userShipping.userShippingApartmentNr;
      this.shippingAddress.shippingZipCode = userShipping.userShippingZipCode;
      this.shippingAddress.shippingName = userShipping.userShippingName;
    } else {
      this.shippingAddress.shippingCity = '';
      this.shippingAddress.shippingStreet = '';
      this.shippingAddress.shippingHouseNr = '';
      this.shippingAddress.shippingApartmentNr = '';
      this.shippingAddress.shippingZipCode = '';
      this.shippingAddress.shippingName = '';
    }
  }

  onSelect(food: Food) {
    this.selectedFood = food;
    this.router.navigate(['/bookDetail', this.selectedFood.id]);
  }

  getCartItemList() {
    this.cartService.getCartItemList().subscribe(
      res => {
        this.cartItemList = JSON.parse(res);
        this.cartItemNumber = this.cartItemList.length;
      },
      error => {
        console.log(error.text());
      }
    );
  }

  setPaymentMethod(userPayment: UserPayment) {

    if (userPayment) {

      this.payment.type = userPayment.type;
      this.payment.cardName = userPayment.cardName;
      this.payment.cardNumber = userPayment.cardNumber;
      this.payment.cvc = userPayment.cvc;
      this.payment.defaultPayment = userPayment.defaultPayment;
      this.billingAddress.billingName = userPayment.userBilling.userBillingName;
      this.billingAddress.billingStreet = userPayment.userBilling.userBillingStreet;
      this.billingAddress.billingHouseNr = userPayment.userBilling.userBillingHouseNr;
      this.billingAddress.billingApartmentNr = userPayment.userBilling.userBillingCity;
      this.billingAddress.billingZipCode = userPayment.userBilling.userBillingZipCode;
      this.billingAddress.billingCity = userPayment.userBilling.userBillingCity;

    } else {
      this.payment.type = '';
      this.payment.cardNumber = '';
      this.payment.cardName = '';
      this.payment.cvc = '';
      this.payment.defaultPayment = false;
      this.billingAddress.billingName = '';
      this.billingAddress.billingStreet = '';
      this.billingAddress.billingHouseNr = '';
      this.billingAddress.billingApartmentNr = '';
      this.billingAddress.billingZipCode = '';
      this.billingAddress.billingCity = '';
    }
  }

  setBillingAsShipping(checked: boolean) {
    console.log('same address as shipping');

    if (checked) {
      this.billingAddress.billingName = this.shippingAddress.shippingName;
      this.billingAddress.billingStreet = this.shippingAddress.shippingStreet;
      this.billingAddress.billingZipCode = this.shippingAddress.shippingZipCode;
      this.billingAddress.billingHouseNr = this.shippingAddress.shippingHouseNr;
      this.billingAddress.billingApartmentNr = this.shippingAddress.shippingApartmentNr;
    } else {
      this.billingAddress.billingZipCode = '';
      this.billingAddress.billingApartmentNr = '';
      this.billingAddress.billingHouseNr = '';
      this.billingAddress.billingStreet = '';
      this.billingAddress.billingName = '';
    }
  }

  onSubmit() {
    this.checkoutService.checkout(
      this.shippingAddress,
      this.billingAddress,
      this.payment,
      this.shippingMethod
    ).subscribe(
      res => {
        this.order = JSON.parse(res);
        console.log(this.order);

        const navigationExtras: NavigationExtras = {
          queryParams: {
            order: JSON.stringify(this.order)
          }
        };

        this.router.navigate(['/orderSummary'], navigationExtras);
      },
      error => {
        console.log(error.text());
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
