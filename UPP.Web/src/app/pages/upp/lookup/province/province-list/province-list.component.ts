import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Province } from '../../model/province';
import { ProvinceService } from '../province.service';

@Component({
  selector: 'ngx-province-list',
  templateUrl: './province-list.component.html',
  styleUrls: ['./province-list.component.scss']
})
export class ProvinceListComponent implements OnInit {
 provinceForm: FormGroup;
 provinces:Province[] = [];
 province: Province = new Province();

 source: LocalDataSource = new LocalDataSource(this.provinces);
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

   columns:{
     provinceId: {
       title: 'ID',
       type: 'number'
     },
     provinceName: {
      title: 'Desc',
      type: 'string'
    },
    provinceCode: {
      title: 'Code',
      type: 'string'
    },
    isActive: {
      title: 'Active',
      type: 'bool'
    }
   },
   pages: {
     perPage: 10
   }
 }
  constructor(private provinceService: ProvinceService,
              private router: Router,
              private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.getProvinces();
  }

  addRecord(event){
    this.province.provinceName = event.newData.provinceName;
    this.province.provinceCode = event.newData.provinceCode;
    this.province.isActive = event.newData.isActive;
    this.provinceService.save(this.province).subscribe(
      res => {
        event.confirm.resolve(event.newData);
        this.toastrService.success('Record saved successfully.');
        this.getProvinces();
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

  updateRecord(event){
    this.province.provinceName = event.newData.provinceName;
    this.province.provinceCode = event.newData.provinceCode;
    this.province.isActive = event.newData.isActive;
    this.province.provinceId = event.newData.provinceId;
    this.provinceService.update(this.province).subscribe(
      res => {
        event.confirm.resolve(event.newData);
        this.toastrService.success('Record updated successfully.');
        this.getProvinces();
      }, (err: HttpErrorResponse) => {
        if(err.error instanceof Error){
          this.toastrService.danger('Error saving record. Please contact your UPP administrator', 'UPP')
        }else{
          this.toastrService.danger('Error saving record. Please contact your UPP administrator', 'UPP')
        }
      }
    )
  }

  deleteRecord(event){
   if(window.confirm('Are you sure you want to delete this record')){
     this.province.provinceId = event.newData.provinceId;
     this.provinceService.delete(this.province.provinceId).subscribe(
       res => {
         this.toastrService.success('Record successfully deleted');
         this.getProvinces();
       }, (err: HttpErrorResponse) => {
         if(err.error instanceof Error){
          this.toastrService.danger('Error deleting record. Please contact your UPP administrator', 'UPP');
        }else{
          this.toastrService.danger('Error deleting record. Please contact your UPP administrator', 'UPP');
         }
       }
     )
   }
  }


  getProvinces(){
    return this.provinceService.getMany().subscribe((data: Province[]) => {
        this.provinces = data;
        this.source.load(data)
      }
    )
  }

}
