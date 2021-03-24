import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbCardModule, NbInputModule, NbButtonModule, NbCheckboxModule,
  NbIconModule, NbSelectModule, NbTabsetModule, NbRouteTabsetModule,
} from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../../@theme/theme.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeCreateComponent } from './employee-create.component';


@NgModule({
    declarations: [
      EmployeeComponent,
      EmployeeCreateComponent,
      EmployeeListComponent,
      EmployeeEditComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      NbCardModule,
      NbInputModule,
      NbButtonModule,
      NbCheckboxModule,
      NbIconModule,
      NbSelectModule,
      Ng2SmartTableModule,
      ThemeModule,
      NbTabsetModule,
      NbRouteTabsetModule,
      EmployeeRoutingModule
    ],
  })
  export class EmployeeModule { }