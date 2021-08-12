
  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeCreateComponent } from './employee-create.component';
import { EmployeeEditBulkComponent } from './employee-edit-bulk/employee-edit-bulk.component';
import { EmployeeListViewComponent } from './employee-list-view/employee-list-view.component';

  const routes: Routes = [{
      path: '',
      component: EmployeeComponent,
      children: [
        {
          path: 'employees',
          component: EmployeeListComponent,
        },
        {
          path: 'employees-list-view',
          component: EmployeeListViewComponent,
        },
        {
          path: 'employee-create',
          component: EmployeeCreateComponent,
        },
        {
          path: 'employee-edit',
          component: EmployeeEditComponent,
        },    
        {
          path: 'employee-edit-bulk',
          component: EmployeeEditBulkComponent,
        }, 
      ],
  }];
  
  @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule],
    })
    
  export class EmployeeRoutingModule { }
  
  