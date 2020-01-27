import {Component, OnInit} from '@angular/core';
import {FoodService} from '../../services/food.service';
import {Food} from '../../models/food';
import {interval, Subscription} from 'rxjs';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  private foodListByDayTime: Food[] = [];
  private interval: Subscription;

  constructor(private foodService: FoodService,
              private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {

    this.loginService.checkSession().subscribe(
      () => {
      },
      () => {
        console.log('session inactive');
        this.router.navigate(['/myAccount']).then(() => location.reload());;
      });


    this.interval = interval(5000).subscribe(() => {
      this.foodService.getFoodByDayTime().subscribe(
        res => {
          console.log(res);
          this.foodListByDayTime = JSON.parse(res);
        },
        error => {
          console.log(error);
        });
    });
  }

}
