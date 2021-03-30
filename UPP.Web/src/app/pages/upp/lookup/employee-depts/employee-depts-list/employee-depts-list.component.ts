import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { truncate } from 'fs';
import { LocalDataSource } from 'ng2-smart-table';
import { EmployeeService } from '../../../employee/service/employee.service';
import { EmployeeDepartment } from '../../model/employee-department';
import { EmployeeDeptsService } from '../employee-depts.service';

@Component({
  selector: 'ngx-employee-depts-list',
  templateUrl: './employee-depts-list.component.html',
  styleUrls: ['./employee-depts-list.component.scss']
})
export class EmployeeDeptsListComponent implements OnInit {

  employeeDepts: EmployeeDepartment[] = [];
  employeeDept: EmployeeDepartment = new EmployeeDepartment();
  source: LocalDataSource = new LocalDataSource(this.employeeDepts)

  constructor(private empDeptService: EmployeeDeptsService,
              private  toastrService: NbToastrService,
              private router: Router) { }

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
    columns:
    {
      empDeptId: {
        title: 'ID',
        type: 'number',
      },           
      empDeptDesc: {
        title: 'Desc',
        type: 'string',
      },
      activeYn: {
        title: 'Status',
        type: 'string',
        //valuePrepareFunction: (cell, row) => { if(row.data.activeYn == true) {  return `<p>Active</p>`;} else{return '<p>Deactivated</p>'} },
      },


    //   rowClassFunction: (row) => {
    //     console.log(row.data.activeYn)
    //     if(row.data.activeYn == true){
    //       console.log('active')
    //         return 'Activate';
    //     } else {
    //       console.log('deactivated')

    //         return 'Deactivated';
    //     }
    // },  

    },
    pager: {
      perPage: 10,
    },
  }; 

  ngOnInit(): void {
    this.getEmpDepts();
  }

  addRecord(event){
   this.employeeDept.empDeptDesc = event.newData.empDeptDesc;
   this.employeeDept.activeYn = event.newData.activeYn;
   this.empDeptService.save(this.employeeDept).subscribe(
     res => {
           event.confirm.resolve(event.newData);
           this.toastrService.success('Record successfully added.', 'UPP')
           this.getEmpDepts();
     },
     (err: HttpErrorResponse) => {
       if(err.error instanceof Error){
         this.toastrService.danger('Error saving record. Please contact your UPP administrator', 'UPP')
       } else{
         this.toastrService.danger('Error saving record. Please contact your UPP administrator', 'UPP')
       }
     }
   )
  }
   
  updateRecord(event){
    this.employeeDept.empDeptDesc = event.newData.empDeptDesc;
    this.employeeDept.activeYn = event.newData.activeYn;
    this.employeeDept.empDeptId = event.newData.empDeptId;

    this.empDeptService.update(this.employeeDept).subscribe(
      res => {
        event.confirm.resolve(event.newData);
        this.toastrService.success('Record successfully added.', 'UPP')
      }, (err: HttpErrorResponse) => {
        if(err.error instanceof Error){
          this.toastrService.danger('Error saving record. Please contact your UPP administrator', 'UPP')
        } else{
          this.toastrService.danger('Error saving record. Please contact your UPP administrator', 'UPP')
        }
      }
    )
  }

  deleteRecord(event){
     if(window.confirm('Are you sure you want to delete')) {
       this.employeeDept.empDeptId = event.newData.empDeptId;
       this.empDeptService.delete(this.employeeDept.empDeptId).subscribe(
         res => {
          event.confirm.resolve(event.newData);
          this.toastrService.success('Record deleted successfully.', 'UPP');
          this.getEmpDepts();
         },
         (err: HttpErrorResponse)=> {
           if (err.error instanceof Error) {
             this.toastrService.danger('Error deleting record. Please contact your N.P.D.R administrator', 'UPP');
           }else{
             this.toastrService.danger('Error deleting record. Please contact your N.P.D.R administrator', 'UPP');
           }
         }
       )
     }else{
      event.confirm.reject();
     }
  }

  getEmpDepts() {
    this.empDeptService.getData().subscribe((data: EmployeeDepartment[])=> {
      this.employeeDepts = data;
      this.source.load(data);
    })
  }

}
