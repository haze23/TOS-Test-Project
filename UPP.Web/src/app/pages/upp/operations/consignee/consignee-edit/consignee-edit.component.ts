import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { LookupsService } from '../../../lookup/lookups.service';

import { Consignee } from '../../model/consignee';
import { BookingService } from '../../service/booking.service';

@Component({
  selector: 'ngx-consignee-edit',
  templateUrl: './consignee-edit.component.html',
  styleUrls: ['./consignee-edit.component.scss']
})
export class ConsigneeEditComponent implements OnInit {

  consigneeForm: FormGroup;
  consignee: Consignee = new Consignee();
  provinces:[];
  areas: [];
  countries:[];

  constructor(protected ref: NbDialogRef<ConsigneeEditComponent>,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private toastrService: NbToastrService,
              private bookService: BookingService,
              private lookupService: LookupsService) {}

  ngOnInit(): void {
    this.loadLookups();
    let id = this.route.snapshot.paramMap.get('id');
    this.consigneeForm = this.formBuilder.group({
      consigneeName :['', Validators.required],
      address :['', Validators.required],
      countryId :[0, Validators, Validators.required],
      provinceId :[0, Validators.required],
      areaId :[0, Validators.required],
      contactNo :['', Validators.required],
      email :['',Validators.required]
    })

    if(id){
      this.PopulateForm(+id)
    }
  }

  PopulateForm(id:number){
    this.bookService.getConsignee(id).subscribe(type => {
      this.consignee = type;

      this.consigneeForm.setValue({
      consigneeId: type.consigneeId,
      consigneeName :type.consigneeName,
      address :type.address,
      countryId: type.countryId,
      provinceId :type.provinceId,
      areaId :type.areaId,
      contactNo :type.contactNo,
      email :type.email,
      })
    })
  }

  onSubmit(){
    const formValue = this.consigneeForm.value;
    this.consignee.consigneeName = formValue.consigneeName;
    this.consignee.address = formValue.address;
    this.consignee.countryId = formValue.countryId;
    this.consignee.provinceId = formValue.provinceId,
    this.consignee.areaId = formValue.areaId;
    this.consignee.contactNo = formValue.contactNo;
    this.consignee.email = formValue.email;

    if (this.consignee.consigneeId > 0) {
      this.bookService.updateConsignee(this.consignee).subscribe(data => {
        this.toastrService.success('Record saved successfully.');
        this.router.navigate([''])
      }, error => {
        this.toastrService.danger('Error occured in saving the record.')
      })
    } else {
      this.bookService.saveConsignee(this.consignee).subscribe((data: {}) => {
        this.toastrService.success('Consignee saved successfully')
        this.router.navigate([''])
      })
    }
  }

  onCancel(){
    this.consignee.consigneeName = '';
    this.consignee.address = '';
    this.consignee.countryId = 0;
    this.consignee.provinceId = 0;
    this.consignee.areaId = 0;
    this.consignee.contactNo = '';
    this.consignee.email = '';
    this.ref.close();

  }


  loadLookups(){
    this.lookupService.getCountries().subscribe(
      res => {
      this.countries = res as [];
    });
    this.lookupService.getProvinces().subscribe(
      res => {
      this.provinces = res as [];
    });
    this.lookupService.getArea().subscribe(
      res => {
      this.provinces = res as [];
    });
  }



}
