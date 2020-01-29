import 'hammerjs';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HomePageComponent} from './components/home-page/home-page.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {CarouselDayTimeComponent} from './components/home-page/carousel-day-time/carousel-day-time.component';
import {FooterComponent} from './components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MyAccoutComponent} from './components/my-accout/my-accout.component';
import {LoginService} from './services/login.service';
import {UserService} from './services/user.service';
import {HttpClientModule} from '@angular/common/http';
import {DeleteDialogComponent, MyProfileComponent} from './components/my-profile/my-profile.component';
import {LoadingComponent} from './components/shared-components/loading/loading.component';
import {ShippingService} from './services/shipping.service';
import {FoodListComponent} from './components/food-list/food-list.component';
import {CarouselCaloricNeedsComponent} from './components/home-page/carousel-caloric-needs/carousel-caloric-needs.component';
import {FoodDetailComponent} from './components/food-detail/food-detail.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {OrderComponent} from './components/order/order.component';
import {OrderSummaryComponent} from './components/order-summary/order-summary.component';
import {UserStatsComponent} from './components/user-stats/user-stats.component';
import {CarouselFatContainsComponent} from './components/home-page/carousel-fat-contains/carousel-fat-contains.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';


@NgModule({
  entryComponents: [
    DeleteDialogComponent
  ],
  declarations: [
    AppComponent,
    HomePageComponent,
    NavBarComponent,
    CarouselDayTimeComponent,
    FooterComponent,
    MyAccoutComponent,
    MyProfileComponent,
    DeleteDialogComponent,
    LoadingComponent,
    FoodListComponent,
    CarouselCaloricNeedsComponent,
    FoodDetailComponent,
    ShoppingCartComponent,
    OrderComponent,
    OrderSummaryComponent,
    UserStatsComponent,
    CarouselFatContainsComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    MatTabsModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    MatSortModule,
    MatRadioModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule
  ],
  providers: [
    LoginService,
    UserService,
    ShippingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
