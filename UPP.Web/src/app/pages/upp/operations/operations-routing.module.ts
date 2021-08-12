
  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  
import { Routes, RouterModule } from '@angular/router';
import { OperationsComponent } from './operations.component';
import { BookingEditComponent } from './booking/booking-edit/booking-edit.component';
import { ConsigneeEditComponent } from './consignee/consignee-edit/consignee-edit.component';
import { ConsignorEditComponent } from './consignor/consignor-edit/consignor-edit.component';
import { BookingCartComponent } from './booking/booking-cart/booking-cart.component';
import { BookingComponent } from './booking/booking.component';


  const routes: Routes = [{
      path: '',
      component: OperationsComponent,
      children: [
        {
          path: 'bookings',
          component: BookingComponent,
        },
        {
          path: 'booking-edit',
          component: BookingEditComponent,
        },
        {
          path: 'booking-cart',
          component: BookingCartComponent,
        },
        {
            path: 'consignor',
            component: ConsignorEditComponent,
        },
        {
            path: 'consignee',
            component: ConsigneeEditComponent,
        },
       
      ],
  }];
  
  @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule],
    })
    
  export class OperationsRoutingModule { }
  
  