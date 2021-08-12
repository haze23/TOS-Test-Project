import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { LookupsService } from '../../../lookup/lookups.service';
import { ConsigneeEditComponent } from '../../consignee/consignee-edit/consignee-edit.component';
import { Consignor } from '../../model/consignor';
import { BookingService } from '../../service/booking.service';

@Component({
  selector: 'ngx-consignor-edit',
  templateUrl: './consignor-edit.component.html',
  styleUrls: ['./consignor-edit.component.scss']
})
export class ConsignorEditComponent implements OnInit {

  consignorForm: FormGroup;
  consignor: Consignor = new Consignor();
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
    this.consignorForm = this.formBuilder.group({
      consigneeName :['', Validators.required],
      countryId:[0, Validators.required],
      address :['', Validators.required],
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
    this.bookService.getConsignor(id).subscribe(type => {
      this.consignor = type;

      this.consignorForm.setValue({
      consignorId: type.consignorId,
      consignorName :type.consignorName,
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
    const formValue = this.consignorForm.value;
    this.consignor.consignorName = formValue.consigneeName;
    this.consignor.address = formValue.address;
    this.consignor.countryId =  formValue.countryId,
    this.consignor.provinceId = formValue.provinceId,
    this.consignor.areaId = formValue.areaId;
    this.consignor.contactNo = formValue.contactNo;
    this.consignor.email = formValue.email;

    if (this.consignor.consignorId > 0) {
      this.bookService.updateConsignor(this.consignor).subscribe(data => {
        this.toastrService.success('Record saved successfully.');
        this.router.navigate([''])
      }, error => {
        this.toastrService.danger('Error occured in saving the record.')
      })
    } else {
      this.bookService.saveConsignor(this.consignor).subscribe((data: {}) => {
        this.toastrService.success('Consignor saved successfully')
        this.router.navigate([''])
      })
    }
  }

  onCancel(){
    this.consignor.consignorName = '';
    this.consignor.address = '';
    this.consignor.countryId = 0;
    this.consignor.provinceId = 0;
    this.consignor.areaId = 0;
    this.consignor.contactNo = '';
    this.consignor.email = '';
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
