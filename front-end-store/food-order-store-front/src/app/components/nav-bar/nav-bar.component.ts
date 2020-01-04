import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private loggedIn = false;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res => {
        console.log(res);
        this.loggedIn = true;
      }, (error) => {
        console.log(error);
        this.loggedIn = false;
      }
    );
  }

  logout() {
    const xToken = localStorage.getItem('xAuthToken');
    if (xToken) {
      this.loginService.logoutMe().subscribe(
        res => {
          location.reload();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
