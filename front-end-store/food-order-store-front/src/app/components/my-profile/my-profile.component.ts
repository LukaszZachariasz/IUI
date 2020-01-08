import {Component, OnInit} from '@angular/core';
import {AppConst} from '../../constants/app-const';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  private dataFetched = false;
  private loggedIn = false;

  private user: User = new User();
  private updateSuccess = false;
  private updateError = false;
  private newPassword: string;
  private currentPasswordError = false;
  private confirmNewPassword: string;
  private currentPassword: string;

  constructor(private userService: UserService,
              private loginService: LoginService,
              private router: Router
  ) {}

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      () => {
        this.loggedIn = true;
      },
      () => {
        this.loggedIn = false;
        console.log('session inactive');
        this.router.navigate(['/myAccount']);
      });
    this.getCurrentUserInfo();
  }

  getCurrentUserInfo() {
    this.userService.getCurrentUser().subscribe(
      res => {
        this.user = JSON.parse(res);
        this.dataFetched = true;
      });
  }

  onUpdateUserInfo() {
    this.userService.updateUserInfo(this.user, this.newPassword, this.currentPassword)
      .subscribe(
        res => {
          if (res === 'updateSuccess')
          this.setUpdateSuccess();
        },
        error => {
          console.log(error);
          if ('invalidPassword' === error['error']) {
            this.setCurrentPasswordError();
          } else {
            this.setUpdateError();
          }
        });
  }

  setUpdateSuccess() {
    this.updateSuccess = true;
    console.log('updated');
    setTimeout(() => {
      this.updateSuccess = false;
    }, AppConst.infoTimeout);
  }

  setUpdateError() {
    this.updateError = true;
    setTimeout(() => {
      this.updateError = false;
    }, AppConst.infoTimeout);
  }

  private setCurrentPasswordError() {
    this.currentPasswordError = true;
    setTimeout(() => {
      this.currentPasswordError = false;
    }, AppConst.infoTimeout);
  }
}
