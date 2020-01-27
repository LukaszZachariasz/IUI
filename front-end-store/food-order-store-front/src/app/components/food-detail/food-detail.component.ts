import {Component, OnInit} from '@angular/core';
import {Food} from '../../models/food';
import {AppConst} from '../../constants/app-const';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CartService} from '../../services/cart.service';
import {FoodService} from '../../services/food.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {

  private foodID: number;
  private food: Food = new Food();
  private serverPath = AppConst.serverPath;
  private valuesOfQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  private qty = 1;

  private addBookSuccess = false;
  private fetchedFood = false;

  private imageServerPath = AppConst.imageServerPath;
  private extension = AppConst.extension;

  constructor(private cartService: CartService,
              private foodService: FoodService,
              private router: Router,
              private httpClient: HttpClient,
              private route: ActivatedRoute) {
  }

  onAddToCart() {
    this.cartService.additem(this.foodID, this.qty).subscribe(
      res => {
        console.log(this.qty);
        console.log(res);
        this.addBookSuccess = true;
      }, error => {
        console.log(error);
        this.addBookSuccess = false;
      });
  }


  ngOnInit() {
    this.fetchedFood = false;
    this.route.params.forEach((params: Params) => {
      console.log(params);
      this.foodID = Number.parseInt(params['id']);

      console.log(this.foodID);
    });

    if (this.foodID) {
      this.foodService.getFood(this.foodID).subscribe(
        res => {
          this.food = JSON.parse(res);
          console.log(this.food);
          this.fetchedFood = true;
        },
        error => {
          this.fetchedFood = false;
          console.log('ERROR: ' + error);
        }
      );
    }

    this.qty = 1;
  }

  changeVal(value: any) {
    this.qty = value;
  }
}
