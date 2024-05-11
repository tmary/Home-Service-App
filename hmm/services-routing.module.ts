import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services.component';
import { NgModule } from '@angular/core';
export const routes: Routes = [
  {
    path: '',
    pathMatch:'full',
    component:ServicesComponent
  }
];
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class ServicesRoutingModule{}

