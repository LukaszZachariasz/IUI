import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private credential = {username: '', password: ''};
  private loggedIn = false;

  ngOnInit() {
    const xToken = localStorage.getItem('xAuthToken');
    if (xToken) {
      this.loginService.checkSession().subscribe(
        res => {
          console.log('Good')
          this.loggedIn = true;
        },
        error => {
          console.log('error = ' + error)
          this.loggedIn = false;
        }
      );
    }
  }


  constructor(private loginService: LoginService) {
  }

  onSubmit() {
    this.loginService
      .sendCredential(this.credential.username, this.credential.password)
      .subscribe(
        res => {
          localStorage.setItem('xAuthToken', res['token']);
          this.loggedIn = true;
          const encodedCredentials = btoa(this.credential.username + ':' + this.credential.password);
          localStorage.setItem('credentials', encodedCredentials);
          location.reload();
        },
        error => {
          console.log(error);
        }
      );
  }


}
