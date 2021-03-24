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



@NgModule({
  declarations: [
    LookupComponent,
    GenderListComponent,
    EquityListComponent,
    EmployeeDeptsListComponent
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
