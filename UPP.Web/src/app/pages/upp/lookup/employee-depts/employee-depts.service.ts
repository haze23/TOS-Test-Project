import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared-service/api-http.service';
import { EmployeeDepartment } from '../model/employee-department';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDeptsService {

  urlPart = 'employee-depts'
  constructor( private apiService: ApiHttpService) { }

  getMany(){
    return this.apiService.get<EmployeeDepartment[]>(this.urlPart)
  }

  getData() {
    return this.apiService.get(this.urlPart)
  }

  getOne(id: number){
    return this.apiService.get(`${this.urlPart}/${id}`)
  }

  save(employeeDept: EmployeeDepartment){
    return this.apiService.post<EmployeeDepartment>(this.urlPart, employeeDept)
  }

  update(employeeDept: EmployeeDepartment){
    return this.apiService.put<EmployeeDepartment>(`${this.urlPart}/${employeeDept.empDeptId}`, employeeDept)
  }

  delete(id: number){
    return this.apiService.delete(`${this.urlPart}/${id}`)
  }

}
