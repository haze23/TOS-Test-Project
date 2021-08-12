import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Area } from '../../model/area';
import { AreaService } from '../area.service';

@Component({
  selector: 'ngx-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss']
})
export class AreaListComponent implements OnInit {
 areaForm: FormGroup;
 areas: Area[] = [];
 area: Area = new Area();

 source: LocalDataSource = new LocalDataSource(this.areas)
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
     areaId: {
       title: 'ID',
       type: 'number'
     },
     areaCode: {
      title: 'Code',
      type: 'string'
    },
    areaDesc: {
      title: 'Desc',
      type: 'string'
    }
   },
   page: {
     perPage: 10
   }
 }

  constructor(private areaService: AreaService,private toastrService:NbToastrService) { }

  ngOnInit(): void {
    this.getAreas();
  }

 addRecord(event){
  this.area.AreaCode = event.newData.AreaCode;
  this.area.AreaDesc = event.newData.AreaDesc;
  this.areaService.save(this.area).subscribe(
    res=> {
      event.confirm.resolve(event);
      this.toastrService.success('Record successfully saved!');
    },(err: HttpErrorResponse) => {
      if(err.error instanceof Error){
        this.toastrService.danger('');
      }else{
        this.toastrService.danger('');
      }
    }
  )

 }

 updateRecord(event){
  this.area.AreaCode = event.newData.AreaCode;
  this.area.AreaDesc = event.newData.AreaDesc;
  this.area.AreaId = event.newData.AreaId;
  this.areaService.update(this.area).subscribe(
    res => {
      event.confirm.resolve(event.newData);
      this.toastrService.success('Record successfully updated!', 'UPP')
    },(err: HttpErrorResponse) => {
      if(err.error instanceof Error){
        this.toastrService.danger('Error occured in trying to update the record', 'UPP')
      } else{
        this.toastrService.danger('Error occured in trying to update the record', 'UPP')
      }
    }
  );
 }

 deleteRecord(event){
   if(window.confirm('Are you sure you want to delete this record?')){
     this.area.AreaId = event.newData.AreaId;
     this.areaService.delete(this.area.AreaId).subscribe(
       res => {
         event.confirm.resolve(event.newData);
         this.toastrService.success('Record successfully deleted!');
         this.getAreas();
       },(err: HttpErrorResponse) => {
         if(err.error instanceof Error){
          this.toastrService.danger('Error occured in trying to delete the record', 'UPP')
        }else{
          this.toastrService.danger('Error occured in trying to delete the record', 'UPP')
         }
       }
     )
   }else{

   }

 }






  getAreas() {
    this.areaService.getMany().subscribe((data) => {
        this.areas = data;
        this.source.load(data);
    })
  }

}
