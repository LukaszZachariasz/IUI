import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppConst} from '../../constants/app-const';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-accout',
  templateUrl: './my-accout.component.html',
  styleUrls: ['./my-accout.component.css']
})
export class MyAccoutComponent implements OnInit {

  encapsulation: ViewEncapsulation.None;

  private serverPath = AppConst.serverPath;
  private loginError = true;
  private loggedIn = false;
  private credentials = {'username': '', 'password': ''};

  private emailSent = false;
  private usernameExist: boolean;
  private username: string;
  private email: string;

  private emailNotExists = false;
  private forgetPasswordEmailSent: boolean;

  constructor(private loginService: LoginService,
              private userService: UserService,
              private router: Router) {

  }

  ngOnInit() {
  }

  onLogin() {
    this.loginService.sendCredentials(this.username, this.credentials.password)
      .subscribe(
        res => {
          localStorage.setItem('xAuthToken', res['token']);
          console.log(res);
          location.reload();
          this.loggedIn = true;
          this.router.navigate(['/']);
        },
        error => {
          this.loggedIn = false;
          this.loginError = true;
          console.log(error);
        });
  }

}
