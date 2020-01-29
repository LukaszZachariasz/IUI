import {Component, OnInit} from '@angular/core';
import {Food} from '../../models/food';
import {Router} from '@angular/router';
import {GetFoodListService} from '../../service/get-food-list.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RemoveFoodService} from '../../service/remove-food.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html'
})
export class DeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) {
  }
}

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {

  private selectedFoodItem: Food;
  private checked: boolean;
  private foodList: Food[] = [];
  private allChecked: boolean;
  private removeFoodList: Food[] = [];

  private displayedColumns: string[] = ['select', 'id', 'name', 'weight', 'kcal', 'percentOfFat', 'category', 'price', 'active', 'action'];

  private dataSource: MatTableDataSource<Food> = new MatTableDataSource<Food>(this.foodList);
  private selection = new SelectionModel<Food>(true, this.foodList);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: Food): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      const index: number = this.foodList.findIndex(d => d === item);
      this.foodList.splice(index, 1);
      console.log('Removed Item with ID ' + item.id);
      this.removeFoodService.removeFood(item.id).subscribe(
        res => {
          this.getFoodList();
        },
        error => {
          console.log(error);
        });
      this.dataSource = new MatTableDataSource<Food>(this.foodList);
      this.selection = new SelectionModel<Food>(true, this.foodList);
    });
    this.selection = new SelectionModel<Food>(true, []);
  }


  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  constructor(private getFoodListService: GetFoodListService,
              private removeFoodService: RemoveFoodService,
              private router: Router,
              public dialog: MatDialog) {
  }

  onFoodSelect(food: Food) {
    this.selectedFoodItem = food;
    this.router.navigate(['/viewFood', this.selectedFoodItem.id]).then(
      res => {
        location.reload();
      });
  }

  ngOnInit() {
    this.getFoodList();
  }

  openDialog(food: Food) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(
      res => {
        console.log(res);
        if (res === 'yes') {
          this.removeFoodService.removeFood(food.id).subscribe(
            resp => {
              console.log(resp);
              this.getFoodList();
            },
            error => {
              console.log(error);
            });
        }
      });
  }

  getFoodList() {
    this.getFoodListService.getFoodList().subscribe(
      res => {
        console.log(JSON.parse(res));
        this.foodList = JSON.parse(res);
        this.dataSource = new MatTableDataSource<Food>(this.foodList);
        this.selection = new SelectionModel<Food>(true, this.foodList);
      },
      error => {
        console.log(error);
      });
  }

  isAnyoneThere() {
    return this.foodList.length > 0;
  }

}
