import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { LookupsService } from '../../../lookup/lookups.service';
import { Delivery } from '../../model/delivery';
import { BookingService } from '../../service/booking.service';

@Component({
  selector: 'ngx-delivery-edit',
  templateUrl: './delivery-edit.component.html',
  styleUrls: ['./delivery-edit.component.scss']
})
export class DeliveryEditComponent implements OnInit {

 deliveryForm: FormGroup;
 delivery: Delivery = new Delivery();
 trucks: [];

 constructor(private formBuilder: FormBuilder, 
             private bookService: BookingService,
             private lookupService: LookupsService,
             private route: ActivatedRoute,
             private router: Router,
             private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.loadLookups();

    let id = this. route.snapshot.paramMap.get('id');
    this.deliveryForm = this.formBuilder.group({
      deliveryId:[0],
      bookingId :[0],
      truckId:[0,Validators.required],
      from :['',Validators.required],
      to :['',Validators.required],
      despatchTime :[null,Validators.required],
      arrivalTime :[null,Validators.required],
      isActive :[false,Validators.required],

    })

    if(id){
      this.populateForm(+id)
    }
  }

  populateForm(id:number){
    this.bookService.getDevelivery(id).subscribe(type => {
      this.delivery = type;

      this.deliveryForm.setValue({
      deliveryId: type.deliveryId,
      bookingId :type.bookingId,
      truckId: type.truckId,
      from :type.from,
      to :type.to,
      despatchTime :type.despatchTime,
      arrivalTime :type.arrivalTime,
      isActive: type.isActive
      })
    })
  }

 onSubmit() {
   const formValue = this.deliveryForm.value;

   this.delivery.deliveryId = formValue.deliveryId;
   this.delivery.bookingId = formValue.bookingId;
   this.delivery.truckId = formValue.truckId;
   this.delivery.from = formValue.from;
   this.delivery.to = formValue.to;
   this.delivery.despatchTime = formValue.despatchTime;
   this.delivery.arrivalTime = formValue.arrivalTime;
   this.delivery.isActive = formValue.isActive;

   if(this.delivery.deliveryId > 0){
   this.bookService.updateDelivery(this.delivery).subscribe((data) => {
    this.toastrService.success('Record successfully updated!', 'UPP');
    this.router.navigate([''])
   }, error => {
     this.toastrService.danger('Error occured in updating the record', 'UPP')
   })
   }else
   this.bookService.saveDelivery(this.delivery).subscribe((data) => {
     this.toastrService.success('Record successfully saved!', 'UPP');
     this.router.navigate([''])
   });
  }

 onCancel() {
   this.delivery.deliveryId = 0;
   this.delivery.bookingId = 0;
   this.delivery.truckId = 0;
   this.delivery.from = '';
   this.delivery.to = '';
   this.delivery.despatchTime = new Date();
   this.delivery.arrivalTime = new Date();
   this.delivery.isActive = false
   
 }
 
  loadLookups() {
   this.lookupService.getTrucks().subscribe(
      res=> {
        this.trucks = res as [];
      }
    )
  }
}
