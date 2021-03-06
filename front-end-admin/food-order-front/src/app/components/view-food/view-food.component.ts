import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GetFoodService} from '../../service/get-food.service';
import {Food} from '../../models/food';
import {AppConst} from '../../constants/app-const';

@Component({
  selector: 'app-view-food',
  templateUrl: './view-food.component.html',
  styleUrls: ['./view-food.component.css']
})
export class ViewFoodComponent implements OnInit {

  private serverPath = AppConst.serverPath;
  private foodItem: Food = new Food();
  private foodItemId: number;
  private imageServerPath =  this.serverPath + '/image/food/';
  private extension = AppConst.extension;

  constructor(private getFoodService: GetFoodService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.foodItemId = Number.parseInt(params['id']);
    });
    this.getOne(this.foodItemId);
  }

  getOne(id: number) {
    this.getFoodService.getFood(id).subscribe(
      res => {
        console.log(res);
        this.foodItem = JSON.parse(res);
      }, error => {
        console.log(error);
      });
  }

  onEditSelect(foodItem: Food) {
    this.router.navigate(['/editFood', foodItem.id])
      .then(() => location.reload());
  }
}
