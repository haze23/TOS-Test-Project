import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { LookupsService } from '../../lookups.service';
import { PaymentTypes } from '../../model/payment-types';
import { PaymentTypeService } from '../payment-type-service.service';

@Component({
  selector: 'ngx-payment-types-list',
  templateUrl: './payment-types-list.component.html',
  styleUrls: ['./payment-types-list.component.scss']
})
export class PaymentTypesListComponent implements OnInit {
  paymentTypesFrom: FormGroup;
  paymentType: PaymentTypes
  paymentTypes: PaymentTypes[] = [];

  source: LocalDataSource = new LocalDataSource(this.paymentTypes);
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      paymentTypesId: {
        title: 'ID',
        type: 'number'
      },
      paymentTypesDesc: {
        title: 'Desc',
        type: 'string'
      },
      isActive : {
        title: 'Active',
        type: 'bool'
      }
    },
    pager: {
      perPage: 10
    }
  }

  constructor(private lookupService: LookupsService,
             private router: Router,
             private paymentTypeService : PaymentTypeService,
             private toastrService:NbToastrService) { }

  ngOnInit(): void {
    this.getPaymentTypes();
  }

  addRecord(event) {
    this.paymentType.paymentTypesDesc = event.newData.paymentTypeDesc;
    this.paymentType.isActive = event.newData.isActive;
    this.paymentTypeService.save(this.paymentType).subscribe(
      res => {
        event.confirm.resolve(event.newData);
        this.toastrService.success('');
        this.getPaymentTypes();
      },
      (err: HttpErrorResponse) => {
        if(err.error instanceof Error){
          this.toastrService.danger('Error saving record. Please contact your UPP administrator', 'UPP')
        }else{
          this.toastrService.danger('Error saving record. Please contact your UPP administrator', 'UPP')
        }
      }
    )
  }

  updateRecord(event) {
    this.paymentType.paymentTypesDesc = event.newData.paymentTypesDesc;
    this.paymentType.isActive = event.newData.isActive;
    this.paymentType.paymentTypesId = +event.newData.paymentTypesId;

    this.paymentTypeService.update(event.newData).subscribe(
      res => {
        event.confirm.resolve(event.newData);
        this.toastrService.success('')
      },(err: HttpErrorResponse) => {
        if (err.error instanceof Error){
          this.toastrService.danger('Error saving record. Please contact your UPP administrator', 'UPP')
        }else{
          this.toastrService.danger('Error saving record. Please contact your UPP administrator', 'UPP')
        }
      }
    )
  }

  deleteRecord(event){
    if(window.confirm("Are you sure you want to delete this record?")) {
      this.paymentType.paymentTypesId = event.newData.paymentTypesId;
      this.paymentTypeService.delete(this.paymentType.paymentTypesId).subscribe(
        res => {
          event.confirm.resolve(event.newData);
          this.toastrService.success('Record deleted successfully.', 'UPP');
          this.getPaymentTypes();
        },
        (err: HttpErrorResponse) => {
          if(err.error instanceof Error){
            this.toastrService.danger('Error deleting record. Please contact your UPP administrator', 'UPP');
          }else{
            this.toastrService.danger('Error deleting record. Please contact your UPP administrator', 'UPP');
          }
        }
      );    
    }
    else{
       event.confirm.reject(); 
    }
  }

  getPaymentTypes() {
    this.paymentTypeService.getData().subscribe((data: PaymentTypes[]) =>{
      this.paymentTypes = data;
      this.source.load(data);
    })
  }

}
