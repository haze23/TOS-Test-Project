import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { ApiHttpService } from '../../../../shared-service/api-http.service';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  urlPart = 'employees'
  errorMgmt: any;

  constructor(private apiService: ApiHttpService,
    public http: HttpClient) { }

  getMany() {
    return this.apiService.get<Employee[]>(this.urlPart)
  }
  getData() {
    return this.apiService.get(this.urlPart);
  }

  getOne(id: number) {
    return this.apiService.get<Employee>(`${this.urlPart}/${id}`);
  }

  getEmployeeImage(id: string): Observable<any> {
    return this.http.get('http://localhost:4401/api/' + `${this.urlPart}/getEmployeeImage?id=${id}`, {
    })
      .pipe(
        //catchError(error => this.errorHandler(error))
      );
  }

  save(employee: Employee) {
    return this.apiService.post<Employee>(this.urlPart, employee);
  }

  saveEmployee(employeeFormData: FormData) {
    return this.http.post<Employee>('http://localhost:4401/api/' + `${this.urlPart}/saveEmployee`, employeeFormData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      // catchError(this.errorMgmt)
    );
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
      //catchError(this.errorMgmt)
    );
  }  

  getEmployees() {
    return this.apiService.get<Employee[]>(this.urlPart);
  }

}

