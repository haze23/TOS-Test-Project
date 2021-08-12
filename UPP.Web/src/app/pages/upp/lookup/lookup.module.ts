import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupComponent } from './lookup.component';
import { EquityListComponent } from './equity/equity-list/equity-list.component';
import { GenderListComponent } from './gender/gender-list/gender-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbInputModule, NbButtonModule, NbCheckboxModule, NbIconModule, NbSelectModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../../@theme/theme.module';
import { LookupRoutingModule } from './lookup-routing.module';
import { EmployeeDeptsListComponent } from './employee-depts/employee-depts-list/employee-depts-list.component';
import { PaymentTypesListComponent } from './payment-types/payment-types-list/payment-types-list.component';
import { ProvinceListComponent } from './province/province-list/province-list.component';
import { AreaListComponent } from './area/area-list/area-list.component';



@NgModule({
  declarations: [
    LookupComponent,
    GenderListComponent,
    EquityListComponent,
    EmployeeDeptsListComponent,
    PaymentTypesListComponent,
    ProvinceListComponent,
    AreaListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LookupRoutingModule,
    ReactiveFormsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbIconModule,
    NbSelectModule,
    Ng2SmartTableModule,
    ThemeModule
  ],
})
export class LookupModule { }
