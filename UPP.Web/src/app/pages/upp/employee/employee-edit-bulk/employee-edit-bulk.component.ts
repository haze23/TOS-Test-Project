import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
import { requiredFileType } from '../../shared/files/file';
import { FileService } from '../../shared/file.service';


@Component({
  selector: 'ngx-employee-edit-bulk',
  templateUrl: './employee-edit-bulk.component.html',
  styleUrls: ['./employee-edit-bulk.component.scss']
})
export class EmployeeEditBulkComponent implements OnInit {

  employeeBulkForm: FormGroup;
  bulkEmployeeUploadFile: File;
  bulkEmployeeFormData: FormData;
  bulkEmployeeFormIsValid = false;

  employees: Employee[] = [];
  uploadStatus :string;
  progress: number = 0;
  bulkUploaded=false;
  invalidFileSelected=false;

  deleteIcon = true;
  fileUpload = false;
  fileUrl: string;
  message: string;

  constructor(
    private employeeService: EmployeeService,
    private toastrService: NbToastrService,  
    private fileService: FileService
  ) { }

  ngOnInit(): void {
    this.employeeBulkForm = new FormGroup({
    });
  }
  
  public onSubmitBulkEmployees() {
    if (this.bulkEmployeeFormIsValid) {
      this.bulkEmployeeFormData = new FormData();
      debugger;
      this.bulkEmployeeFormData.append('bulkEmployeeFile', this.bulkEmployeeUploadFile,
        this.bulkEmployeeUploadFile.name);
      this.employeeService.saveBulkEmployees(this.bulkEmployeeFormData).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            this.uploadStatus= 'Upload started';
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            this.uploadStatus= 'Upload received';
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.uploadStatus= 'Upload in progress';
            this.progress = Math.round(event.loaded / event.total * 50);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            this.uploadStatus= 'Upload complete';
            this.progress = 100;
            console.log('User successfully created!', event.body);
            this.toastrService.success('Record saved successfully.');

           this.bulkUploaded = true;
        }
      });
    }
  }

  public onBulkEmployeeFileChange(e): void {
    console.log('upload');
    if (e.target.files && e.target.files[0]) {
      this.bulkEmployeeUploadFile = e.target.files[0];
      this.deleteIcon = false;
      this.fileUpload = true;
      if (

        requiredFileType('xlsx', this.bulkEmployeeUploadFile)
        || requiredFileType('xlsb', this.bulkEmployeeUploadFile)
        || requiredFileType('xls', this.bulkEmployeeUploadFile)
        || requiredFileType('xlt', this.bulkEmployeeUploadFile)
        || requiredFileType('xltx', this.bulkEmployeeUploadFile)
      ) {
        this.invalidFileSelected=false;
        this.bulkEmployeeFormIsValid = true;
        console.log('file is okay on frontened');
        //show mesage for rquired file formatsa and set form to invalid
      }else{
        this.invalidFileSelected=true;
      }
    }
  }

  downloadBulkTemplate() {
    this.fileService.downloadBulkTemplate();
  }

  onCancel(){

  }
}


