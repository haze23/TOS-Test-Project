
  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

  const routes: Routes = [{
      path: '',
      component: EmployeeComponent,
      children: [
        {
          path: 'employees',
          component: EmployeeListComponent,
        },
        {
          path: 'employee-edit',
          component: EmployeeEditComponent,
        },

        {
          path: 'tabs',
          component: EmployeeEditComponent,
          children: [
            {
              path: '',
              redirectTo: 'tab1',
              pathMatch: 'full',
            },
            {
              path: 'tab1',
              component: EmployeeListComponent,
            },
            {
              path: 'tab2',
              component: EmployeeListComponent,
            },
          ],
        },

     
      ],
  }];
  
  @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule],
    })
    
  export class EmployeeRoutingModule { }
  
  