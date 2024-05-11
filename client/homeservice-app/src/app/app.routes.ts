import { NgModule , DoBootstrap} from '@angular/core';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookingComponent } from './booking/booking.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { BookingManagementComponent } from './booking-management/booking-management.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { RatesComponent } from './rates/rates.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card'
import { AccountMgtComponent } from './account-mgt/account-mgt.component';
import { UsersComponent } from './users/users.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserModule, bootstrapApplication, platformBrowser } from '@angular/platform-browser';
import { AuthGuard } from './guards/auth.guard';
import { ServiceAreasComponent } from './service-areas/service-areas.component';

export const routes: Routes = [
  //{path: '', redirectTo: '/login', pathMatch: 'full'},
  {path:'homepage', loadComponent:() => import('./homepage/homepage.component').then((c) => c.HomepageComponent) },
  {path:'login',loadComponent:()=> import('./login/login.component').then((c) => c.LoginComponent)},
  {path : 'signup',pathMatch:'full',loadComponent:()=> import('./registration/registration.component').then((c) => c.RegistrationComponent)},
  {path : 'booking', loadComponent:() => import('./booking/booking.component').then((c) =>c.BookingComponent)},
  {path: 'service-list', loadComponent:()=> import ('./service-list/service-list.component').then((c)=>c.ServiceListComponent) },
  {path:'users', pathMatch:'full', loadComponent:() => import('./users/users.component').then((c) =>c.UsersComponent)},
  {path:'dashboard', loadComponent:() => import('./dashboard/dashboard.component').then((c)=>c.DashboardComponent)},
  {path:'rates', loadComponent: () => import('./rates/rates.component').then((c) => c.RatesComponent)},
  {path:'promotions', loadComponent: () => import('./promotions/promotions.component').then((c) => c.PromotionsComponent)},
  {path:'feedback', loadComponent: () => import('./feedback/feedback.component').then((c) => c.FeedbackComponent)},
  {path:'booking-management', loadComponent: () => import('./booking-management/booking-management.component').then((c) => c.BookingManagementComponent)},
  {path: 'homerepair', loadComponent:() => import('./homerepair/homerepair.component').then((c) => c.HomerepairComponent)},
  {path:'service-areas', loadComponent:() => import('./service-areas/service-areas.component').then((c) => c.ServiceAreasComponent)},
  {path:'account-mgt', loadComponent: () => import('./account-mgt/account-mgt.component').then((c) => c.AccountMgtComponent)},
  {path: '**', redirectTo:'/homepage'}
];

@NgModule({
  imports:[RouterModule.forRoot(routes), NgbModule, MatFormFieldModule, MatInput,
    MatCardModule, BrowserModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
