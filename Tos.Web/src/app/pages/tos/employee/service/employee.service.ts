import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared-service/api-http.service';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  urlPart = 'employees'

  constructor(private apiService: ApiHttpService) { }

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
    return this.apiService.put<Employee>(`${this.urlPart}?${employee.id}`, employee);
  }

  delete(id: number) {
   return this.apiService.delete(`${this.urlPart}/${id}`);
  }
  
}

