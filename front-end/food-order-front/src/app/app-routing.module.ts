import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AddNewFoodComponent} from './components/add-new-food/add-new-food.component';
import {FoodListComponent} from './components/food-list/food-list.component';
import {ViewFoodComponent} from './components/view-food/view-food.component';
import {EditFoodComponent} from './components/edit-food/edit-food.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'addNewFood',
    component: AddNewFoodComponent
  },
  {
    path: 'foodList',
    component: FoodListComponent
  },
  {
    path: 'viewFood/:id',
    component: ViewFoodComponent
  },
  {
    path: 'editFood/:id',
    component: EditFoodComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
