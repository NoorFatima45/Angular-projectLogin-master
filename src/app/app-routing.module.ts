import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './services/auth.guard';
import { MenuComponent } from './components/menu/menu.component';
import { loginGuard } from './services/login.guard';
import { OrderComponent } from './components/order/order.component';
import { AboutComponent } from './components/about/about.component';




const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'',
   redirectTo:'login',
   pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate:[authGuard]
  },
  {
    path:'menu',
    component:MenuComponent,
    canActivate:[authGuard]
  },
  {
    path:'about',
    component:AboutComponent,
    canActivate:[authGuard]
  },
  {
    path:'order',
    component:OrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
