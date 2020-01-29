import {Component, OnInit} from '@angular/core';
import {Order} from '../../models/order';
import {CartItem} from '../../models/cart-item';
import {CheckoutService} from '../../services/checkout.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  private order: Order = new Order();
  private estimatedDeliveryDate: string;
  private cartItemList: CartItem[] = [];

  constructor(private checkoutService: CheckoutService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.order = JSON.parse(params['order']);
      const deliveryDate = new Date();
      deliveryDate.setMinutes(deliveryDate.getMinutes() + Math.floor(Math.random() * 40) + 60);
      this.estimatedDeliveryDate = deliveryDate.toLocaleTimeString();
      this.cartItemList = this.order.cartItemList;
    });
  }


}
