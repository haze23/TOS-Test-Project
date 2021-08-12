import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { LookupsService } from '../../../lookup/lookups.service';
import { BookingDescription } from '../../model/booking-description';
import { BookingService } from '../../service/booking.service';

@Component({
  selector: 'ngx-booking-description-edit',
  templateUrl: './booking-description-edit.component.html',
  styleUrls: ['./booking-description-edit.component.scss']
})
export class BookingDescriptionEditComponent implements OnInit {
  bookDescriptionForm: FormGroup;
  bookDescription: BookingDescription = new BookingDescription();
  weightTypes: [];
  rates: [];
  
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private bookService: BookingService,
    private lookupService: LookupsService) {}

  ngOnInit(): void {
     
    this.loadLookups();

    let id = this.route.snapshot.paramMap.get('id');
    this.bookDescriptionForm = this.formBuilder.group({
      bookingId :[0, Validators.required],
      quantity :[0, Validators.required],
      actualWeight :[0, Validators.required],
      grossWeight : [0, Validators.required],
      weightTypeId : [0, Validators.required],
      rateId :[0, Validators.required],
      rateCharge :[0, Validators.required],
      createdDate :[new Date(), Validators.required]
      
    })

    if(id){
      this.PopulateForm(+id)
    }
  }

  PopulateForm(id:number){
    this.bookService.getTransitGoods(id).subscribe(type => {
      this.bookDescription = type;

      this.bookDescriptionForm.setValue({
        bookingId: type.bookingId,
        quantity :type.quantity,
        actualWeight :type.actualWeight,
        grossWeight :type.grossWeight,
        weightTypeId :type.weightTypeId,
        rateId :type.rateId,
        createdrateChargeBy :type.rateCharge,
        createdby :type.createdby,
        createdDate :type.createdDate,

      })
    })
  }

  onSubmit(){
    const formValue = this.bookDescriptionForm.value;
    this.bookDescription.bookingId = formValue.bookingId;
    this.bookDescription.quantity = formValue.quantity,
    this.bookDescription.actualWeight = formValue.actualWeight;
    this.bookDescription.grossWeight = formValue.grossWeight;
    this.bookDescription.weightTypeId = formValue.weightTypeId;
    this.bookDescription.rateId = formValue.rateId;
    this.bookDescription.rateCharge = formValue.rateCharge;
    this.bookDescription.createdby = formValue.createdby;
    this.bookDescription.createdDate = formValue.createdDate;


    if (this.bookDescription.bookingDescriptionId > 0) {
      this.bookService.updateTransitGoods(this.bookDescription).subscribe(data => {
        this.toastrService.success('Record saved successfully.');
        this.router.navigate([''])
      }, error => {
        this.toastrService.danger('Error occured in saving the record.')
      })
    } else {
      this.bookService.saveTransitGoods(this.bookDescription).subscribe((data: {}) => {
        this.toastrService.success('booking saved successfully')
        this.router.navigate([''])
      })
    }
  }

  onCancel(){
    this.bookDescription.bookingId = 0;
    this.bookDescription.quantity = 0,
    this.bookDescription.actualWeight =  0,
    this.bookDescription.grossWeight =  0,
    this.bookDescription.weightTypeId =  0,
    this.bookDescription.rateId =  0,
    this.bookDescription.rateCharge =  0,
    this.bookDescription.createdby = '',
    this.bookDescription.createdDate = new Date()
  }

  loadLookups() {
    this.lookupService.getWeightTypes().subscribe(
      res => {
        this.weightTypes = res as [];
      }
    )
    this.lookupService.getRates().subscribe(
      res => {
        this.rates = res as [];
      }
    )

    
   
    
  }

}
