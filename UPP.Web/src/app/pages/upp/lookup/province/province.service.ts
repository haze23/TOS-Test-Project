import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared-service/api-http.service';
import { Province } from '../model/province';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  urlPart = 'province'
  constructor(private apiService: ApiHttpService) { }

  getMany(){
   return this.apiService.get<Province[]>(this.urlPart);
  }

  getData(){
   return this.apiService.get(this.urlPart);
  }

  getOne(id: number){
    return this.apiService.get(`${this.urlPart}/${id}`);
  }

  save(province: Province){
  return this.apiService.post<Province>(this.urlPart, province)
  }

  update(province: Province){
    return this.apiService.put<Province>(`${this.urlPart}/${province.provinceId}`, province)
  }

  delete(id: number){
   return this.apiService.delete(`${this.urlPart}/${id}`)
  }
}
