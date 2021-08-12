import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { NbToastrService } from '@nebular/theme';
import { BookingService } from '../../service/booking.service';
import { Employee } from '../../../employee/model/employee';
import { DeliveryDriver } from '../../model/delivery-driver';

@Component({
  selector: 'ngx-assign-driver-delivery',
  templateUrl: './assign-driver-delivery.component.html',
  styleUrls: ['./assign-driver-delivery.component.scss']
})
export class AssignDriverDeliveryComponent implements OnInit {

  searchForm: FormGroup;
  deliveryDriver: DeliveryDriver = new DeliveryDriver();
  lstDrivers: any;
  lstUnAssignedDriversDelivery: any;
  deliveryDriverResponse: Response;
  deliveryUnAssignedDriverResponse: Response;

  unassigned = false;
  assigned = false;

  constructor(
    private toastrService: NbToastrService,
    private bookService: BookingService,
  ) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchField: new FormControl()
    });
  }

 driverUnAssignedDelivaries() {
   
    this.bookService.getDriverUnassignedDelivaries(this.deliveryDriver.driverId).toPromise().then(response => {
      this.deliveryUnAssignedDriverResponse = JSON.parse(JSON.stringify(response));
        this.lstUnAssignedDriversDelivery = this.deliveryUnAssignedDriverResponse;
        //populate the drivers grid
      
    }).catch((error) => {
      // console.log(error);
    }
    );
  }



  onSearch() {

  }

  onDrop(event: CdkDragDrop<string[]>) {

    if (event.container.id === 'unAssignedDrivers' && event.previousContainer.id === 'assignedDrivers') {
      const deliveryDriver = this.lstDrivers[event.previousIndex];

      if (deliveryDriver !== null) {
        this.unassigned = true;
        this.onUnassign(this.deliveryDriver.driverId);
      }
      
    } else if (event.container.id === 'assignedDrivers' && event.previousContainer.id === 'unAssignedDrivers') {
      const deliveryDriver = this.lstUnAssignedDriversDelivery[event.previousIndex];
      //console.log('unassign');
      if (deliveryDriver !== null) {
        //console.log('unassign');
        this.assigned = true;
        this.onAssign(this.deliveryDriver.driverId);
      }

    }
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onAssign(driverId: number) {

    if (driverId) {
      this.deliveryDriver = {
        updatedDate: null,
        deliveryDriverId:  this.deliveryDriver.deliveryDriverId,
        assistantId: this.deliveryDriver.assistantId,
        isActive: true,
        driverId: driverId,
        createdDate: new Date()
      };

      this.bookService.saveDeliveryDriver(this.deliveryDriver).subscribe(response => {
        this.deliveryDriverResponse = JSON.parse(JSON.stringify(response));
        console.log("Delivery Driver Result: " + this.deliveryDriverResponse)
        //this.refreshCourses();
      });

    }
  }

  onUnassign(driverId: number) {
    // update
    if (driverId) {

      this.deliveryDriver = {
        deliveryDriverId: this.deliveryDriver.deliveryDriverId,
        driverId: this.deliveryDriver.driverId,
        assistantId: this.deliveryDriver.assistantId,
        isActive: false,
        createdDate: new Date(),
        updatedDate: new Date()

      };

      this.bookService.updateDriverDeliveryStatus(this.deliveryDriver).subscribe(response => {
        this.deliveryDriverResponse = JSON.parse(JSON.stringify(response));
      });

    }
  }





}
