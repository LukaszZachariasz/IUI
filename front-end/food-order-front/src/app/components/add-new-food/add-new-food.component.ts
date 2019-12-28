import {Component, OnInit} from '@angular/core';
import {Food} from '../../models/food';
import {AddNewFoodService} from '../../service/add-new-food.service';

@Component({
  selector: 'app-add-new-food',
  templateUrl: './add-new-food.component.html',
  styleUrls: ['./add-new-food.component.css']
})
export class AddNewFoodComponent implements OnInit {

  private newFoodItem: Food = new Food();
  private foodItemAdded = false;

  constructor(private addNewFoodService: AddNewFoodService) {
  }

  ngOnInit() {
    this.foodItemAdded = false;
  }

  onSubmit() {
    this.addNewFoodService.sendNewFood(this.newFoodItem).subscribe(
      res => {
        this.foodItemAdded = true;
        this.newFoodItem = new Food();
      },
      err => {
        this.foodItemAdded = false;
        console.log(err);
      });
  }

  onActiveChange($event) {
    this.newFoodItem.active = $event.checked;
  }
}
