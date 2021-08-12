import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'ngx-employee-list-view',
  templateUrl: './employee-list-view.component.html',
  styleUrls: ['./employee-list-view.component.scss']
})
export class EmployeeListViewComponent implements OnInit {
  employees: Employee[] = [];
  employee: Employee = new Employee();
  source: LocalDataSource = new LocalDataSource(this.employees)

  settings = {
    hideSubHeader: true,
    actions: {
      position: 'right', 
      // custom: [
      //   {
      //     name: 'viewRecord',
      //     type: 'html',
      //     title: '<i class="fas fa-eye" title="View"></i>',
      //   },
      // ],  
    },

    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: false,
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
      employeeNo: {
        title: 'Emp No',
        type: 'string'
      },
      firstname: {
        title: 'Firstname',
        type: 'string'
      },
      lastname: {
        title: 'Lastname',
        type: 'string'
      },
      identityNo: {
        title: 'ID No',
        type: 'string'
      },
      genderDesc: {
        title: 'Gender',
        type: 'string'
      },
      email: {
        title: 'Email',
        type: 'string'
      },
      contact: {
        title: 'Contact',
        type: 'string'
      },

    }
  }

  constructor(private employeeService: EmployeeService,
    private router: Router,
    private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.getEmployees();
  }
  addRecord(event) {

  }
  updateRecord(event) {

  }

  deleteRecord(event) {
    if (window.confirm('Are you sure you want to delete the record?')) {
      this.employee.employeeId = event.employee.employeeId;
      this.employeeService.delete(this.employee.employeeId).subscribe(data => {
        this.toastrService.success('Record successfully deleted !', 'UPP')
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.toastrService.success('Error occured in deleting the record', 'UPP')
        } else {
          this.toastrService.success('Error occured in deleting the record', 'UPP')
        }
      })
    } else {
      event.confirm.reject();
    }
  }

  getEmployees() {
    return this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
      this.source.load(data)
      console.log(this.employees)
    }
    )
  }

}
