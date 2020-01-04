import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppConst} from '../../constants/app-const';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-my-accout',
  templateUrl: './my-accout.component.html',
  styleUrls: ['./my-accout.component.css']
})
export class MyAccoutComponent implements OnInit {


  private serverPath = AppConst.serverPath;
  private loginError = false;
  private loggedIn = false;
  private credentials = {'username': '', 'password': ''};

  private emailSent = false;
  private usernameExists: boolean;
  private emailExists: boolean;
  private username: string;
  private email: string;

  private emailNotExists = false;
  private forgetPasswordEmailSent: boolean;
  private recoverEmail: string;

  constructor(private loginService: LoginService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res => {
        this.loggedIn = true;
      },
      error => {
        this.loggedIn = false;
      }
    );
  }

  onLogin() {
    this.loginService
      .sendCredentials(this.credentials.username, this.credentials.password)
      .subscribe(
        res => {
          this.loggedIn = true;
          const encodedCredentials = btoa(this.credentials.username + ':' + this.credentials.password);
          localStorage.setItem('xAuthToken', res['token']);
          localStorage.setItem('credentials', encodedCredentials);
          this.router.navigate(['/home']).then(
            res => {
              location.reload();
            });
        },
        error => {
          this.loggedIn = false;
          this.loginError = true;
        }
      );
  }

  onNewAccount() {
    this.usernameExists = false;
    this.emailExists = false;
    this.emailSent = false;

    this.userService.newUser(this.username, this.email).subscribe(

      res => {console.log(this.username + "   " + this.email);
        console.log(res);
        this.emailSent = true;
      },
      error => {console.log(this.username + "   " + this.email);
        console.log(error);
        let errorMessage = error;
        if (errorMessage === 'usernameExists') {
          this.usernameExists = true;
        }
        if (errorMessage === 'emailExists') {
          this.emailExists = true;
        }
      }
    );
  }

  onForgetPassword() {
    this.forgetPasswordEmailSent = false;
    this.emailNotExists = false;

    this.userService.retrievePassword(this.recoverEmail).subscribe(
      res => {
        console.log(res);
        this.emailSent = true;
      },
      error => {
        console.log(error.text());
        const errorMessage = error.text();
        if (errorMessage === 'emailExists') {
          this.emailExists = true;
        }
      }
    );
  }

}
