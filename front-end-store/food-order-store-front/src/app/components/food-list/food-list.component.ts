import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FoodService} from '../../services/food.service';
import {Food} from '../../models/food';
import {AppConst} from '../../constants/app-const';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {

  private displayedColumns = ['name', 'price', 'kcal', 'weight', 'image'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private selectedFood: Food;
  private foodList: Food[];
  private serverPath = AppConst.serverPath;
  private dataSource: MatTableDataSource<Food>;


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource = new MatTableDataSource(this.foodList);
    this.dataSource.filter = filterValue;
    console.log('filtering');
  }

  constructor(private foodService: FoodService,
              private router: Router,
              private httpClient: HttpClient,
              private route: ActivatedRoute) {
  }

  onSelect(food: Food) {
    this.selectedFood = food;
    this.router.navigate(['/foodDetail', this.selectedFood.id]);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        if (params['foodList']) {
          console.log('Filtered Food List');
          this.foodList = JSON.parse(params['foodList']);
        } else {
          this.foodService.getFoodList().subscribe(
            res => {
              console.log(res);
              this.foodList = JSON.parse(res);
              this.dataSource = new MatTableDataSource(this.foodList);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            },
            error => {
              console.log(error);
            });
        }
      });
  }

}
