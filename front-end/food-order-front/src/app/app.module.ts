import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {LoginComponent} from './components/login/login.component';
import {LoginService} from './service/login.service';
import {AddNewFoodService} from './service/add-new-food.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddNewFoodComponent} from './components/add-new-food/add-new-food.component';
import {UploadImageService} from './service/upload-image.service';
import {FoodListComponent} from './components/food-list/food-list.component';
import {GetFoodListService} from './service/get-food-list.service';
import {ViewFoodComponent} from './components/view-food/view-food.component';
import {GetFoodService} from './service/get-food.service';
import 'hammerjs';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material/';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    AddNewFoodComponent,
    FoodListComponent,
    ViewFoodComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatCheckboxModule,
    MatListModule
  ],
  providers: [
    LoginService,
    AddNewFoodService,
    UploadImageService,
    GetFoodListService,
    GetFoodService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
