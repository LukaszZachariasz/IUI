import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../service/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private loggedIn = false;

  ngOnInit() {
    const xToken = localStorage.getItem('xAuthToken');
    if (xToken) {
      this.loginService.checkSession().subscribe(
        res => {
          this.loggedIn = true;
        },
        error => {
          this.loggedIn = false;
        }
      );
    }
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

  constructor(private loginService: LoginService) {
  }

}
