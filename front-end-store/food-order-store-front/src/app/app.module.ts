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
import {LoginFormComponent} from './components/my-accout/login-form/login-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material';
import {MyAccoutComponent} from './components/my-accout/my-accout.component';
import {RegisterFormComponent} from './components/my-accout/register-form/register-form.component';
import {ForgotPasswordFormComponent} from './components/my-accout/forgot-password-form/forgot-password-form.component';
import {LoginService} from './services/login.service';
import {UserService} from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavBarComponent,
    CarouselComponent,
    FooterComponent,
    LoginFormComponent,
    MyAccoutComponent,
    RegisterFormComponent,
    ForgotPasswordFormComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    MatTabsModule
  ],
  providers: [
    LoginService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
