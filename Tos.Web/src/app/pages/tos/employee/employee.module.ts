import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbCardModule, NbInputModule, NbButtonModule, NbCheckboxModule,
  NbIconModule, NbSelectModule,
} from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../../@theme/theme.module';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';


@NgModule({
    declarations: [
      EmployeeComponent,
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
      EmployeeRoutingModule
    ],
  })
  export class EmployeeModule { }