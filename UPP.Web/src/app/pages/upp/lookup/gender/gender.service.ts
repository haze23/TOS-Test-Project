import { Injectable } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ApiHttpService } from '../../../../shared-service/api-http.service';
import { Gender } from '../model/gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  urlPart = 'gender';

  constructor(private apiService: ApiHttpService) { }

  getMany(){
    return this.apiService.get<Gender[]>(this.urlPart)
  }

  getData() {
    return this.apiService.get(this.urlPart);
  }

  getOne(id: number){
    return this.apiService.get<Gender>(`${this.urlPart}/${id}`)
  }

  save(gender: Gender) {
    return this.apiService.post<Gender>(this.urlPart, gender)
  }

  update(gender: Gender) {
    return this.apiService.put<Gender>(`${this.urlPart}/${gender.genderId}`,gender)
  }
  
  delete(id: number) {
    return this.apiService.delete(`${this.urlPart}/${id}`);
  }

}
