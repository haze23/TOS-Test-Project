import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared-service/api-http.service';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {

  urlPart = 'lookups'
  constructor(private apiService: ApiHttpService) { }

  getEquities() {
    return this.apiService.get(`${this.urlPart}/getEquity`)
  }

  getGender() {
    return this.apiService.get(`${this.urlPart}/getGender`)
  }
  getEmpDepts() {
    return this.apiService.get(`${this.urlPart}/getEmployeeDepartment`)
  }
}
