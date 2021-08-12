import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { LookupsService } from '../../../lookup/lookups.service';
import { AdditionalBilling } from '../../model/additional-billing';
import { BookingService } from '../../service/booking.service';

@Component({
  selector: 'ngx-additional-billing',
  templateUrl: './additional-billing.component.html',
  styleUrls: ['./additional-billing.component.scss']
})
export class AdditionalBillingComponent implements OnInit {
  additionalBillingForm: FormGroup;
  additionalBilling: AdditionalBilling = new AdditionalBilling();
  paymentTypes: [];
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
    this.additionalBillingForm = this.formBuilder.group({
      additionalBillingId :[0],
      paymentTypeId : [0, Validators.required],
      frightCost :[0, Validators.required],
      discountRate :[0, Validators.required],
      discountAmount :[0, Validators.required],
      totalBilling :[0, Validators.required],   
    })

    if(id){
      this.PopulateForm(+id)
    }
  }

  PopulateForm(id:number){
    this.bookService.getAdditionalBilling(id).subscribe(type => {
      this.additionalBilling = type;

      this.additionalBillingForm.setValue({
        additionalBillingId: type.additionalBillingId,
        paymentTypeId :type.paymentTypeId,
        frightCost :type.frightCost,
        discountRate :type.discountRate,
        discountAmount :type.discountAmount,
        totalBilling :type.totalBilling,
    
      })
    })
  }

  onSubmit(){
    const formValue = this.additionalBillingForm.value;
    this.additionalBilling.additionalBillingId = formValue.additionalBillingId;
    this.additionalBilling.paymentTypeId = formValue.paymentTypeId,
    this.additionalBilling.frightCost = formValue.frightCost;
    this.additionalBilling.discountRate = formValue.discountRate;
    this.additionalBilling.discountAmount = formValue.discountAmount;
    this.additionalBilling.totalBilling = formValue.totalBilling;



    if (this.additionalBilling.additionalBillingId > 0) {
      this.bookService.updateAdditionalBilling(this.additionalBilling).subscribe(data => {
        this.toastrService.success('Record saved successfully.');
        this.router.navigate([''])
      }, error => {
        this.toastrService.danger('Error occured in saving the record.')
      })
    } else {
      this.bookService.saveAdditionalBilling(this.additionalBilling).subscribe((data: {}) => {
        this.toastrService.success('booking saved successfully')
        this.router.navigate([''])
      })
    }
  }

  onCancel(){
    this.additionalBilling.additionalBillingId = 0;
    this.additionalBilling.paymentTypeId = 0,
    this.additionalBilling.frightCost =  0,
    this.additionalBilling.discountRate =  0,
    this.additionalBilling.discountAmount =  0,
    this.additionalBilling.totalBilling =  0
  }

  loadLookups() {
    this.lookupService.getPaymentTypes().subscribe(
      res => {
        this.paymentTypes = res as [];
      }
    )
    

    
      
  }
}
