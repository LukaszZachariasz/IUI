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
import {CarouselComponent} from './components/home-page/carousel/carousel.component';
import {FooterComponent} from './components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule, MatRadioModule, MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {MyAccoutComponent} from './components/my-accout/my-accout.component';
import {LoginService} from './services/login.service';
import {UserService} from './services/user.service';
import {HttpClientModule} from '@angular/common/http';
import {DeleteDialogComponent, MyProfileComponent} from './components/my-profile/my-profile.component';
import { LoadingComponent } from './components/shared-components/loading/loading.component';
import {ShippingService} from './services/shipping.service';

@NgModule({
  entryComponents: [
    DeleteDialogComponent
  ],
  declarations: [
    AppComponent,
    HomePageComponent,
    NavBarComponent,
    CarouselComponent,
    FooterComponent,
    MyAccoutComponent,
    MyProfileComponent,
    DeleteDialogComponent,
    LoadingComponent,
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
    MatRadioModule
  ],
  providers: [
    LoginService,
    UserService,
    ShippingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
