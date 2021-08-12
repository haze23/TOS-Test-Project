import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../shared-service/api-http.service';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {
 
  
  urlPart = 'lookups'
  constructor(private apiService: ApiHttpService) { }

  getArea() {
    return this.apiService.get(`${this.urlPart}/getAreas`)
  }
  getCountries() {
    return this.apiService.get(`${this.urlPart}/getCountries`)
  }
  getProvinces() {
    return this.apiService.get(`${this.urlPart}/getProvinces`)
  }

  getEquities() {
    return this.apiService.get(`${this.urlPart}/getEquity`)
  }

  getGender() {
    return this.apiService.get(`${this.urlPart}/getGender`)
  }
  getEmpDepts() {
    return this.apiService.get(`${this.urlPart}/getEmployeeDepartment`)
  }

  getConsignors() {
    return this.apiService.get(`${this.urlPart}/getConsignors`)
  }
  getConsignees() {
    return this.apiService.get(`${this.urlPart}/getConsignees`)
  }
  getLocations() {
    return this.apiService.get(`${this.urlPart}/getConsignees`)
  }
  getWeightTypes() {
    return this.apiService.get(`${this.urlPart}/getWeightTypes`)
  }
  getRates() {
    return this.apiService.get(`${this.urlPart}/getRates`)
  }
  getPaymentTypes() {
    return this.apiService.get(`${this.urlPart}/getPaymentTypes`) 
  }
  getTrucks() {
    return this.apiService.get(`${this.urlPart}/getTrucks`) 
  }
}
