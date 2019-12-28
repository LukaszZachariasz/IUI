import { Component, OnInit } from '@angular/core';
import {Food} from '../../models/food';

@Component({
  selector: 'app-add-new-food',
  templateUrl: './add-new-food.component.html',
  styleUrls: ['./add-new-food.component.css']
})
export class AddNewFoodComponent implements OnInit {

  private newFoodItem: Food = new Food();
  private foodItemAdded: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

  }

  onActiveChange($event) {
    this.newFoodItem.active = $event.checked;
  }
}
