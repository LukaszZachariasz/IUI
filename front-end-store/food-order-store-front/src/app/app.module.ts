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
import {MatCardModule, MatExpansionModule, MatFormFieldModule, MatTabsModule} from '@angular/material';
import {MyAccoutComponent} from './components/my-accout/my-accout.component';
import {LoginService} from './services/login.service';
import {UserService} from './services/user.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavBarComponent,
    CarouselComponent,
    FooterComponent,
    MyAccoutComponent,
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
    MatFormFieldModule
  ],
  providers: [
    LoginService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
