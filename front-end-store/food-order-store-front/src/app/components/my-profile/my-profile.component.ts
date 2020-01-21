import {Component, OnInit} from '@angular/core';
import {AppConst} from '../../constants/app-const';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {PaymentService} from '../../services/payment.service';
import {UserBilling} from '../../models/user-billing';
import {UserPayment} from '../../models/user-payment';
import {MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {UserShipping} from '../../models/user-shipping';
import {ShippingService} from '../../services/shipping.service';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html'
})
export class DeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) {
  }
}

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})

export class MyProfileComponent implements OnInit {

  private userPaymentList: UserPayment[] = [];
  private userShippingList: UserShipping[] = [];

  private dataSource: MatTableDataSource<UserPayment> = new MatTableDataSource<UserPayment>(this.userPaymentList);
  private selection = new SelectionModel<UserPayment>(true, this.userPaymentList);

  private dataFetched = false;
  private loggedIn = false;

  private user: User = new User();
  private userBilling: UserBilling = new UserBilling();
  private userPayment: UserPayment = new UserPayment();
  private userShipping: UserShipping = new UserShipping();

  private defaultUserPaymentId: number;
  private defaultUserShippingId: number;
  private selectedBillingTab = 0;
  private selectedShippingTab = 0;

  private updateSuccess = false;
  private updateError = false;
  private newPassword: string;
  private currentPasswordError = false;
  private confirmNewPassword: string;
  private currentPassword: string;

  constructor(private userService: UserService,
              private loginService: LoginService,
              private paymentService: PaymentService,
              private shippingService: ShippingService,
              private router: Router,
              private dialog: MatDialog) {
  }

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

    this.userBilling.userBillingCity = '';
    this.userBilling.userBillingCountry = '';
    this.userBilling.userBillingName = '';
    this.userBilling.userBillingZipCode = '';
    this.userBilling.userBillingStreet = '';
    this.userBilling.userBillingApartmentNr = '';
    this.userBilling.userBillingHouseNr = '';
    this.userPayment.type = '';
    this.userPayment.userBilling = this.userBilling;
    this.userShipping.userShippingCity = '';

  }

  getCurrentUserInfo() {
    this.userService.getCurrentUser().subscribe(
      res => {
        this.user = JSON.parse(res);

        console.log(JSON.parse(res));
        this.userShippingList = this.user.userShippingList;
        this.userPaymentList = this.user.userPaymentList;
        console.log(this.userPaymentList);

        for (let index in this.userPaymentList) {
          if (this.userPaymentList[index].defaultPayment) {
            this.defaultUserPaymentId = this.userPaymentList[index].id;
            break;
          }
        }

        for (let index in this.userShippingList) {
          if (this.userShippingList[index].userShippingDefault) {
            this.defaultUserShippingId = this.userShippingList[index].id;
            break;
          }
        }

        this.dataFetched = true;
      });
  }

  onUpdateUserInfo() {
    this.userService.updateUserInfo(this.user, this.newPassword, this.currentPassword)
      .subscribe(
        res => {
          if (res === 'updateSuccess') {
            this.setUpdateSuccess();
          }
        },
        error => {
          console.log(error);
          if ('invalidPassword' === error.error) {
            this.setCurrentPasswordError();
          } else {
            this.setUpdateError();
          }
        });
  }

  onNewPayment() {
    this.paymentService.newPayment(this.userPayment).subscribe(
      res => {
        this.getCurrentUserInfo();
        this.selectedBillingTab = 0;
        this.setUpdateSuccess();
        this.userPayment = new UserPayment();
      }, err => {
        console.log(err);
        this.setUpdateError();
      });
  }

  onUpdatePayment(payment: UserPayment) {
    this.userPayment = payment;
    this.userBilling = payment.userBilling;
    this.selectedBillingTab = 1;
  }

  onRemovePayment(id: number) {
    this.paymentService.removePayment(id).subscribe(
      res => {
        this.getCurrentUserInfo();
        this.selectedBillingTab = 0;
      },
      err => {
        console.log(err);
      });
  }

  setDefaultPayment() {
    this.paymentService.setDefaultPayment(this.defaultUserPaymentId).subscribe(
      res => {
        this.getCurrentUserInfo();
        this.setUpdateSuccess();
      }, err => {
        console.log(err);
        this.setUpdateError();
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


  onNewShipping() {
    this.shippingService.newShipping(this.userShipping).subscribe(
      res => {
        this.getCurrentUserInfo();
        this.selectedShippingTab = 0;
        this.setUpdateSuccess();
        this.userShipping = new UserShipping();
      },
      err => {
        console.log(err.error);
        this.setUpdateError();
      }
    );
  }

  onRemoveShipping(id: number) {
    this.shippingService.removeShipping(id).subscribe(
      res => {
        this.getCurrentUserInfo();
      },
      err => {
        console.log(err.error);
      }
    );
  }

  setDefaultShipping() {
    this.shippingService.setDefaultShipping(this.defaultUserShippingId).subscribe(
      res => {
        this.getCurrentUserInfo();
        this.setUpdateSuccess();
      },
      err => {
        console.log(err.error);
        this.setUpdateError();
      }
    );
  }

  onUpdateShipping(userShipping: UserShipping) {
    this.userShipping = userShipping;
    this.selectedShippingTab = 1;
  }

  selectedShippingChange(val: number) {
    this.selectedShippingTab = val;
  }

  selectedBillingChange(val: number) {
    this.selectedBillingTab = val;
  }

}
