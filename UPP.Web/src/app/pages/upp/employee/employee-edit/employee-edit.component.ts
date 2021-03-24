import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { LookupsService } from '../../lookup/lookups.service';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'ngx-employee-edit',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  empForm: FormGroup;
  employee: Employee = new Employee();
  equities: [];
  genders: [];
  empDepts: [];

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private lookupService: LookupsService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.loadlookups();
    
    let id = this.route.snapshot.paramMap.get('id');
    this.empForm = this.formBuilder.group({ 
      employeeId:[0],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      dob: ['', Validators.required],
      genderId: [0, Validators.required],
      equityId: [0, Validators.required],
      empDeptId: [0, Validators.required],
      employeeNo: ['', Validators.required],
      website:['', Validators.required],
      email:['', Validators.required],
      contact: ['', Validators.required],
      startDate: ['', Validators.required],
    })
    

    if(id){
      this.populateForm(+id)
    }
  }

  populateForm(id: number){
   this.employeeService.getOne(id).subscribe(type => {
     this.employee = type;

     this.empForm.setValue({
      employeeId: type.employeeId,
      firstname: type.firstname,
      lastname: type.lastname,
      dob: type.dob,
      genderId: type.genderId,
      equityId: type.equityId,
      empDeptId: type.empDeptId,
      employeeNo: type.employeeNo,
      website: type.website,
      email: type.email,
      contact: type.contact,
      startDate: type.startDate,
      endDate: type.endDate
     })

   })
  }

  onSubmit(){
     const formValue = this.empForm.value;
      this.employee.firstname = formValue.firstname;
      this.employee.lastname = formValue.lastname;
      this.employee.dob = formValue.dob;
      this.employee.genderId = formValue.genderId;
      this.employee.equityId = formValue.equityId;
      this.employee.employeeNo = formValue.employeeNo;
      this.employee.website = formValue.website;
      this.employee.email = formValue.email;
      this.employee.contact = formValue.contact;
      this.employee.startDate = formValue.startDate;
      this.employee.endDate = formValue.endDate;

      if(this.employee.employeeId > 0){
        this.employeeService.update(this.employee).subscribe(data => {
          this.toastrService.success('Record saved successfully.');
          this.router.navigate([''])
        },error => {
          this.toastrService.danger('Error occured in saving the record.')
        })
      }else{
        this.employeeService.save(this.employee).subscribe( data => {
          this.toastrService.success('Employee saved successfully')
          this.router.navigate([''])
        })
      }
  }

  onCancel(){
    this.employee.firstname  = '';
    this.employee.lastname  =  '';
    this.employee.dob  = new Date();
    this.employee.equityId  =  0;
    this.employee.genderId  = 0; 
    this.employee.website = '';
    this.employee.email = '';
    this.employee.contact = '';
    this.employee.startDate = new Date();
    this.employee.endDate = new Date();    
  }

  loadlookups(){
    this.lookupService.getEquities().subscribe(
      res =>{
         this.equities = res as [];
      }
    )
    this.lookupService.getEmpDepts().subscribe(
      res => {
        this.empDepts = res as [];
      }
    )
    this.lookupService.getGender().subscribe(
      res => {
        this.genders = res as [];
      }
    )
  }

}
