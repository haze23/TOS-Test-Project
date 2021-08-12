import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LookupComponent } from './lookup.component';
import { GenderListComponent } from './gender/gender-list/gender-list.component';
import { EquityListComponent } from './equity/equity-list/equity-list.component';
import { EmployeeDeptsListComponent } from './employee-depts/employee-depts-list/employee-depts-list.component';
import { ProvinceListComponent } from './province/province-list/province-list.component';
import { PaymentTypesListComponent } from './payment-types/payment-types-list/payment-types-list.component';
import { AreaListComponent } from './area/area-list/area-list.component';

const routes: Routes = [{
  path: '',
  component: LookupComponent,
  children: [
    {
      path: 'equity',
      component: EquityListComponent,
    },
    {
      path: 'gender',
      component: GenderListComponent,
    },
    {
      path: 'employee-depts',
      component: EmployeeDeptsListComponent,
    },
    {
      path: 'provinces',
      component: ProvinceListComponent,
    },
    {
      path: 'payment-types',
      component: PaymentTypesListComponent,
    },
    {
      path: 'areas',
      component: AreaListComponent,
    },
  ]
}]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LookupRoutingModule { }
