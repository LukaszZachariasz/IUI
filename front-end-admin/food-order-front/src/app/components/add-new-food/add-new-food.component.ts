import {Component, OnInit} from '@angular/core';
import {Food} from '../../models/food';
import {AddNewFoodService} from '../../service/add-new-food.service';
import {UploadImageService} from '../../service/upload-image.service';

@Component({
  selector: 'app-add-new-food',
  templateUrl: './add-new-food.component.html',
  styleUrls: ['./add-new-food.component.css']
})
export class AddNewFoodComponent implements OnInit {

  private newFoodItem: Food = new Food();
  private foodItemAdded = false;

  constructor(private addNewFoodService: AddNewFoodService,
              private uploadImageService: UploadImageService) {
  }

  ngOnInit() {
    this.foodItemAdded = false;
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + '%';
    }

    return value;
  }

  onSubmit() {
    this.addNewFoodService.sendNewFood(this.newFoodItem).subscribe(
      res => {
        this.uploadImageService.upload(JSON.parse(res)['id']);
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

  onFileInput($event: Event) {
    this.uploadImageService.fileChangeEvent($event);
  }

  changeVal($event: number) {
    console.log(this.newFoodItem.percentOfFat);
  }
}
