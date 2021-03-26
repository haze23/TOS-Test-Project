import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';
import { Observable } from 'rxjs';
import { ApiHttpService } from '../../../../shared-service/api-http.service';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  urlPart = 'employees'

  constructor(private apiService: ApiHttpService,
              public http: HttpClient) { }

  getMany() {
    return this.apiService.get<Employee[]>(this.urlPart)
  }
  getData() {
    return this.apiService.get(this.urlPart);
  }

  getOne(id: number){
    return this.apiService.get<Employee>(`${this.urlPart}/${id}`);
  }

  save(employee: Employee) {
    return this.apiService.post<Employee>(this.urlPart,employee);
  }

  update(employee: Employee) {
    return this.apiService.put<Employee>(`${this.urlPart}?${employee.employeeId}`, employee);
  }

  delete(id: number) {
   return this.apiService.delete(`${this.urlPart}/${id}`);
  }

  saveBulkEmployees(bulkEmployeeFormData: FormData): Observable<object> {
    return this.http.post<Employee>('http://localhost:4401/api/' + `${this.urlPart}/saveBulkEmployees`, bulkEmployeeFormData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      // catchError(this.errorMgmt)
    );
  }
  downloadBulkTemplate() {
    alert('download template')
    //window.open(urlPart + '/api/file/downloadBulkEmplyeeTemplate', '_self');
  }
  
}

