import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {MyAccoutComponent} from './components/my-accout/my-accout.component';
import {MyProfileComponent} from './components/my-profile/my-profile.component';
import {FoodListComponent} from './components/food-list/food-list.component';
import {FoodDetailComponent} from './components/food-detail/food-detail.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {OrderComponent} from './components/order/order.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'myAccount',
    component: MyAccoutComponent
  },
  {
    path: 'myProfile',
    component: MyProfileComponent
  },
  {
    path: 'food',
    component: FoodListComponent
  },
  {
    path: 'foodDetail/:id',
    component: FoodDetailComponent
  },
  {
    path: 'myShoppingCart',
    component: ShoppingCartComponent
  },
  {
    path: 'checkout',
    component: OrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
