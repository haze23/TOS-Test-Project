import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbInputModule, NbButtonModule, NbCheckboxModule, NbIconModule, NbSelectModule, NbTabsetModule, NbDatepickerModule, NbRouteTabsetModule, NbDialogModule, NbAutocompleteModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../../@theme/theme.module';
import { OperationsComponent } from './operations.component';
import { BookingEditComponent } from './booking/booking-edit/booking-edit.component';
import { ConsigneeEditComponent } from './consignee/consignee-edit/consignee-edit.component';
import { ConsignorEditComponent } from './consignor/consignor-edit/consignor-edit.component';
import { OperationsRoutingModule } from './operations-routing.module';
import { BookingCartComponent } from './booking/booking-cart/booking-cart.component';
import { BookingComponent } from './booking/booking.component';
import { AdditionalBillingComponent } from './booking/additional-billing/additional-billing.component';
import * as $ from "jquery";
import { AssignDriverDeliveryComponent } from './deliveries/assign-driver-delivery/assign-driver-delivery.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BookingDescriptionEditComponent } from './booking-description/booking-description-edit/booking-description-edit.component';
import { DeliveryEditComponent } from './deliveries/delivery-edit/delivery-edit.component';


@NgModule({
  declarations: [
    OperationsComponent,
    BookingEditComponent,
    ConsignorEditComponent,
    ConsigneeEditComponent,
    BookingDescriptionEditComponent,
    BookingCartComponent,
    BookingComponent,
    AdditionalBillingComponent,
    AssignDriverDeliveryComponent,
    DeliveryEditComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAutocompleteModule,
    NbIconModule,
    NbSelectModule,
    Ng2SmartTableModule,
    ThemeModule,
    NbTabsetModule,
    NbDatepickerModule,
    NbRouteTabsetModule,
    OperationsRoutingModule,
    DragDropModule,
    NbDialogModule.forChild()
  ]
})
export class OperationsModule { }
