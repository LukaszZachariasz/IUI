import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {

  private canSuggest = false;
  private user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(
      res => {
        this.user = JSON.parse(res);
        console.log(this.user);
        this.canSuggest = this.user.healthStatus != null;
      },
      error => {
        this.canSuggest = false;
        console.log(error);
      });
  }

}
