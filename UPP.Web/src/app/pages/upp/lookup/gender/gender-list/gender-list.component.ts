import { Component, OnInit } from '@angular/core';
import { GenderService } from '../gender.service';
import { NbToastrService } from '@nebular/theme';
import { AppRoutingModule } from '../../../../../app-routing.module';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpErrorResponse } from '@angular/common/http';
import { Gender } from '../../model/gender';

@Component({
  selector: 'ngx-gender-list',
  templateUrl: './gender-list.component.html',
  styleUrls: ['./gender-list.component.scss']
})
export class GenderListComponent implements OnInit {
  
  genderQuery: Gender[] = [];
  gender: Gender = new Gender();
  source: LocalDataSource = new LocalDataSource(this.genderQuery);
  settings = {
   add: {
     addButtonContent: '<i class="nb-plus"></i>',
     createBUttonContent: '<i class="nb-checkamrk"></i>',
     cancelButtonContent: '<i class="nb-close"></i>',
     confirmCreate: true
   },
   edit: {
     editButtonContent: '<i class="nb-edit"></i>',
     saveButtonContent: '<i class="nb-checkmark"></i>',
     cancelButtonContent: '<i class="nb-close"></i>',
     cofirmSave: true
   },
   delete: {
     deleteButtonContent: '<i class="nb-trash"></i>',
     confirmCreate: true
   },
   columns: {
     genderId: {
       title: 'ID',
       type: 'number'
     },
     genderDesc: {
       title: 'Desc',
       type: 'string'
     }
   },
   pager: {
    perPage: 10,
  }
  }

  constructor(
    private genderService: GenderService,
    private toastrService: NbToastrService,
    private router: AppRoutingModule) { }

  ngOnInit(): void {
    this.getGender();
  }

  addRecord(event) {
    this.gender.genderDesc = event.newData.genderDesc;

    this.genderService.save(this.gender).subscribe( 
      res =>{
        event.confirm.resolve(event.newData)
        this.toastrService.success('Record saved successfully.', 'NPDR');
        this.getGender();
      },
      (err: HttpErrorResponse) => {
        if(err.error instanceof Error){
          this.toastrService.danger('Error saving record. Please contact your NPDR administrator', 'NPDR');
        }else{
          this.toastrService.danger('Error saving record. Please contact your NPDR administrator', 'NPDR');
        }
      })
  }

  updateRecord(event) {
    this.gender.genderId = +event.newData.genderId;
    this.gender.genderDesc = event.newData.genderDesc;

    this.genderService.update(this.gender).subscribe( 
      res=> {
        this.toastrService.success('Record saved successfully.', 'NPDR');
        this.getGender();
      },(err: HttpErrorResponse) => {
       if(err.error instanceof Error){
         this.toastrService.danger('Error saving record. Please contact your NPDR administrator', 'NPDR');
       }
       else{
         this.toastrService.danger('Error saving record. Please contact your NPDR administrator', 'NPDR');
       }
      }

    )
  }

  deleteRecord(event){
    if(window.confirm('Are you sure you want to delete this recor?')) {
      this.gender.genderId = event.data.genderId;
      this.genderService.delete(this.gender.genderId).subscribe(
        res => {
          event.confirm.resolve(event.newData);
          this.toastrService.success('Record deleted successfully.', 'NPDR');
          this.getGender();
        },(err: HttpErrorResponse) =>{
          if(err.error instanceof Error){
            this.toastrService.danger('Error deleting record. Please contact your NPDR administrator', 'NPDR')
          }
          else{
            this.toastrService.danger('Error deleting record. Please contact your NPDR administrator', 'NPDR')
          }
        }
      )
    }else{
      event.confirm.reject();
    }
  }
  
  getGender() {
    alert("Hello")
    this.genderService.getData().subscribe((data: Gender[]) => {
      this.genderQuery = data;
      this.source.load(data);
    });
  }

}
