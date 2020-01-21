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
import {error} from 'util';


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

  private displayedColumns: string[] = ['id', 'cardName', 'defaultPayment', 'action'];

  private userPaymentList: UserPayment[] = [
    {id: 1, cardName: 'Master', defaultPayment: true, userBilling: null, type: null, cardNumber: null, cvc: null},
    {id: 2, cardName: 'MyCard', defaultPayment: false, userBilling: null, type: null, cardNumber: null, cvc: null},
    {id: 3, cardName: 'OtherCard', defaultPayment: false, userBilling: null, type: null, cardNumber: null, cvc: null},
    {id: 4, cardName: 'Mobile', defaultPayment: false, userBilling: null, type: null, cardNumber: null, cvc: null},
  ];

  private userShippingList: UserShipping[];

  private dataSource: MatTableDataSource<UserPayment> = new MatTableDataSource<UserPayment>(this.userPaymentList);
  private selection = new SelectionModel<UserPayment>(true, this.userPaymentList);

  private dataFetched = false;
  private loggedIn = false;

  private user: User = new User();
  private userBilling: UserBilling = new UserBilling();
  private userPayment: UserPayment = new UserPayment();
  private userShipping: UserShipping = new UserShipping();

  private defaultShippingSet: boolean;
  private defaultPaymentIsSet: boolean;
  private defaultUserShippingIsSet: boolean;
  private defaultUserPaymentId: number;
  private defaultUserShippingId: number;
  private selectedBillingTab: number;
  private selectedShippingTab: number;

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
    this.defaultPaymentIsSet = false;
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
          if (res === 'updateSuccess') {
            this.setUpdateSuccess();
          }
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

  onNewPayment() {
    this.paymentService.newPayment(this.userPayment).subscribe(
      res => {
        this.getCurrentUserInfo();
        this.selectedBillingTab = 0;
      }, err => {
        console.log(err);
      });
  }

  selectedBillingChange(val: number) {
    this.selectedBillingTab = val;
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
    this.defaultPaymentIsSet = false;
    this.paymentService.setDefaultPayment(this.defaultUserPaymentId).subscribe(
      res => {
        this.getCurrentUserInfo();
        this.defaultPaymentIsSet = true;
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

  isAnyoneThere() {
    return this.userPaymentList.length > 0;
  }


  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: UserPayment): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  openDialog(userPayment: UserPayment) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(
      res => {
        console.log(res);
        if (res === 'yes') {
          this.paymentService.removePayment(userPayment.id).subscribe(
            resp => {
              console.log(resp);
              this.paymentService.getUserPaymentList();
            },
            error => {
              console.log(error);
            });
        }
      });
  }

  onNewShipping() {
    this.shippingService.newShipping(this.userShipping).subscribe(
      res => {
        this.getCurrentUserInfo();
        this.selectedShippingTab = 0;
        this.setUpdateSuccess();
      },
      err => {
        console.log(err['error']);
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
        console.log(err['error']);
      }
    );
  }

  setDefaultShipping() {
    this.defaultUserShippingIsSet = false;
    this.shippingService.setDefaultShipping(this.defaultUserShippingId).subscribe(
      res => {
        this.getCurrentUserInfo();
        this.defaultShippingSet = true;
        this.setUpdateSuccess();
      },
      err => {
        console.log(err['error']);
        this.setUpdateError();
      }
    );
  }

  onUpdateShipping(userShipping: UserShipping) {
    this.userShipping = userShipping;
    this.selectedShippingTab = 1;
  }

  selectedShippingChange($event: number) {

  }
}
