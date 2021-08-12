import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  downloadBulkTemplate() {
    window.open('https://localhost:44323/' + 'api/file/downloadBulkEmployeeTemplate', '_self');
  }
}
