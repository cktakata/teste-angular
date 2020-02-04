import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar os Componentes Gerados no Angular:
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerGetComponent } from './customer-get/customer-get.component';

const routes: Routes = [
  {
    path: 'customer',
    component: CustomerGetComponent
  },
  {
    path: 'customer/create',
    component: CustomerAddComponent
  },
  {
    path: 'customer/edit/:id',
    component: CustomerEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
