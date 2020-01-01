import {Component, OnInit} from '@angular/core';
import {UploadImageService} from '../../service/upload-image.service';
import {Food} from '../../models/food';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GetFoodService} from '../../service/get-food.service';
import {EditFoodService} from '../../service/edit-food.service';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.css']
})
export class EditFoodComponent implements OnInit {

  private foodId: number;
  private toEditFoodItem: Food = new Food();
  private foodUpdated: boolean;

  constructor(private uploadImageService: UploadImageService,
              private editFoodService: EditFoodService,
              private getFoodService: GetFoodService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  onSubmit() {
    this.editFoodService.updateFood(this.toEditFoodItem).subscribe(
      res => {
        this.uploadImageService.modify(JSON.parse(res)['id']);
        this.foodUpdated = true;
      },
      error => {
        console.log(error);
        this.foodUpdated = false;
      }
    );
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.foodId = Number.parseInt((params['id']));
    });

    this.getFoodService.getFood(this.foodId).subscribe(
      res => {
        this.toEditFoodItem = JSON.parse(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  onActiveChange($event) {
    this.toEditFoodItem.active = $event.checked;
  }

  onFileInput($event: Event) {
    this.uploadImageService.fileChangeEvent($event);
  }

}
