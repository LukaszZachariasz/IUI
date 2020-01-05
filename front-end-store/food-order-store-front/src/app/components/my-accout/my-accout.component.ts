import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {AppConst} from '../../constants/app-const';

@Component({
  selector: 'app-my-accout',
  templateUrl: './my-accout.component.html',
  styleUrls: ['./my-accout.component.css']
})
export class MyAccoutComponent implements OnInit {

  private infoTimeout = AppConst.infoTimeout;

  private loggedIn = false;
  private credentials = {'username': '', 'password': ''};

  private username: string;
  private email: string;
  private recoverEmail: string;
  private processStarted = false;
  private retrievePasswordError = false;
  private retrievePasswordSuccess = false;
  private registerError = false;
  private registerSuccess = false;
  private loginError = false;

  constructor(private loginService: LoginService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      () => {
        this.loggedIn = true;
      },
      () => {
        this.loggedIn = false;
      });
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
            () => {
              location.reload();
            });
        },
        () => {
          this.setLoginError();
          this.loggedIn = false;
        }
      );
  }

  onNewAccount() {
    this.processStarted = true;
    this.userService.newUser(this.username, this.email).subscribe(
      () => {
        this.processStarted = false;
        this.setRegisterSuccess();
      },
      () => {
        this.processStarted = false;
        this.setRegisterError();
      });
  }

  onForgetPassword() {
    this.processStarted = true;

    this.userService.retrievePassword(this.recoverEmail).subscribe(
      () => {
        this.setRetrievePasswordSuccess();
        this.processStarted = false;
      },
      () => {
        this.setRetrievePasswordError();
        this.processStarted = false;
      });
  }

  setRetrievePasswordError() {
    this.retrievePasswordError = true;
    setTimeout(() => {
      this.retrievePasswordError = false;
    }, this.infoTimeout);
  }

  setRetrievePasswordSuccess() {
    this.retrievePasswordSuccess = true;
    setTimeout(() => {
      this.retrievePasswordSuccess = false;
    }, this.infoTimeout);
  }

  setRegisterSuccess() {
    this.registerSuccess = true;
    setTimeout(() => {
      this.registerSuccess = false;
    }, this.infoTimeout);
  }

  setRegisterError() {
    this.registerError = true;
    setTimeout(() => {
      this.registerError = false;
    }, this.infoTimeout);
  }

  setLoginError() {
    this.loginError = true;
    setTimeout(() => {
      this.loginError = false;
    }, this.infoTimeout);
  }

}
