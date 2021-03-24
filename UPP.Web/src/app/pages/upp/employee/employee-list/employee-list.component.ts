import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'ngx-employee',
  templateUrl: './employee-list.component.html',  
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employeeForm: FormGroup;
  employees: any;//Employee[] = [];
  employee: Employee = new Employee();
  counter:number;

  constructor(
    private formbuilder: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEmployees();

     let id = this.route.snapshot.paramMap.get('employeeId');
    this.employeeForm = this.formbuilder.group({
      employeeId: [0, [Validators.required]],
      firstname: ['', [Validators.required]],
      dob: ['', Validators.required],
      lastname: ['', [Validators.required]],
      employeeNo: ['',Validators.required],
      website: ['',[Validators.required]],
      email: ['',[Validators.required]],
      contact: ['',[Validators.required]]
    })

     this.populateForm(+id)
  }
  populateForm (id: number) {
    console.log('populateForm: ' + id)

    this.employeeService.getOne(id).subscribe(type => {

       this.employee = type;

       this.employeeForm.setValue({
        employeeId : type.employeeId,
        firstname: type.firstname,
        lastname: type.lastname,
        dob: type.dob,
        employeeNo: type.employeeNo,
        website: type.website,
        email: type.email,
        contact: type.contact

       })
    })
  }
  getEmployees() {
    this.employeeService.getData().subscribe(data =>{ 
      this.employees = data;
      console.log(data);
    });
  }

  website() {
    alert('Website')
  }

  requestCV() {
    alert('request CV')
  }

  
  previous(id: any) {
     let previousId= --id;
      if(this.employees.length >= previousId){
        this.populateForm(previousId)
      }
  }

  next(id: any) {
    let nextId = ++id
    if(this.employees.length >= nextId){
      this.populateForm(nextId)
    }
  }

  first() {
    let first:any = this.employees[0];
    this.counter = first.employeeId;
    this.populateForm(this.counter)
  }
  last() {

    let last:any = this.employees[this.employees.length-1];
    this.counter = last.employeeId;
    this.populateForm(this.counter)
  }

}
