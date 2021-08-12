import { HttpEvent } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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

  employeeForm: FormGroup;
  employee: Employee = new Employee();
  equities: [];
  genders: [];
  empDepts: [];
  fileToUpload: File = null;

  formData: FormData = new FormData();
  imageUrl: string = "assets/images/default-person-img.png";

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private lookupService: LookupsService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadLookups();

    let id = this.route.snapshot.paramMap.get('id');
    this.employeeForm = this.formBuilder.group({
      employeeId: [0],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      identityNo: ['', Validators.required],
      dob: ['', Validators.required],
      genderId: [0, Validators.required],
      equityId: [0, Validators.required],
      empDeptId: [0, Validators.required],
      employeeNo: ['', Validators.required],
      website: ['', Validators.required],
      email: ['', Validators.required],
      contact: ['', Validators.required],
      imageUrl: [''],
      address: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],

    })


    if (id) {
      this.populateForm(+id)
    }
  }

  populateForm(id: number) {
    this.employeeService.getOne(id).subscribe(type => {
      this.employee = type;

      this.employeeForm.setValue({
        employeeId: type.employeeId,
        firstname: type.firstname,
        lastname: type.lastname,
        identityNo: type.identityNo,
        dob: type.dob,
        genderId: type.genderId,
        equityId: type.equityId,
        empDeptId: type.empDeptId,
        employeeNo: type.employeeNo,
        website: type.website,
        email: type.email,
        contact: type.contact,
        imageUrl: type.imageUrl,
        address: type.address,
        startDate: type.startDate,
        endDate: type.endDate
      })

    })
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    this.fileToUpload = file[0];
    debugger;
    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  onSubmit() {
    const formValue = this.employeeForm.value;
    this.employee.firstname = formValue.firstname;
    this.employee.lastname = formValue.lastname;
    this.employee.identityNo = formValue.identityNo;
    this.employee.dob = formValue.dob;
    this.employee.genderId = formValue.genderId;
    this.employee.equityId = formValue.equityId;
    this.employee.empDeptId = formValue.empDeptId;
    this.employee.employeeNo = formValue.employeeNo;
    this.employee.website = formValue.website;
    this.employee.email = formValue.email;
    this.employee.contact = formValue.contact;
    this.employee.imageUrl = formValue.imageUrl;
    this.employee.address = formValue.address;
    this.employee.startDate = formValue.startDate;
    this.employee.endDate = formValue.endDate;

    this.formData.append('firstname', this.employee.firstname);
    this.formData.append('lastname', this.employee.lastname);
    this.formData.append('identityNo', this.employee.identityNo);
    this.formData.append('dob', this.employee.dob.toString());
    this.formData.append('genderId', this.employee.genderId.toString());
    this.formData.append('equityId', this.employee.equityId.toString());
    this.formData.append('empDeptId', this.employee.empDeptId.toString());
    this.formData.append('employeeNo', this.employee.employeeNo);
    this.formData.append('website', this.employee.website);
    this.formData.append('contact', this.employee.contact);
    this.formData.append('imageUrl', this.fileToUpload, this.fileToUpload.name);
    this.formData.append('address', this.employee.address);
    this.formData.append('startDate', this.employee.startDate.toString());
    this.formData.append('endDate', this.employee.endDate.toString());

    this.formData.append('employeeDto', JSON.stringify(this.employee));

    if (this.employee.employeeId > 0) {
      this.employeeService.update(this.employee).subscribe(data => {
        this.toastrService.success('Record saved successfully.');
        this.router.navigate([''])
      }, error => {
        this.toastrService.danger('Error occured in saving the record.')
      })
    } else {
      this.employeeService.saveEmployee(this.formData).subscribe((data: {}) => {
        this.toastrService.success('Employee saved successfully')
        this.router.navigate([''])
      })
    }
  }

  onCancel() {
    this.employee.firstname = '';
    this.employee.lastname = '';
    this.employee.identityNo = '';
    this.employee.dob = new Date();
    this.employee.equityId = 0;
    this.employee.genderId = 0;
    this.employee.website = '';
    this.employee.email = '';
    this.employee.contact = '';
    this.employee.imageUrl = null;
    this.employee.address = '';
    this.employee.startDate = new Date();
    this.employee.endDate = new Date();
  }

  loadLookups() {
    this.lookupService.getEquities().subscribe(
      res => {
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
