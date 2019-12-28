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
    console.log('CHEEECKED');
    this.loginService.checkSession().subscribe(
      res => {
        this.loggedIn = true;
      }, err => {
        this.loggedIn = false;
      }
    );
  }

  constructor(private loginService: LoginService) {
  }

}
