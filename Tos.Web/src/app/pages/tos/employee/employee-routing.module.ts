
  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  
  import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

  const routes: Routes = [{
      path: '',
      component: EmployeeComponent,
      children: [
        {
          path: 'employees',
          component: EmployeeEditComponent,
        },
     
      ],
  }];
  
  @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule],
    })
    
  export class EmployeeRoutingModule { }
  
  