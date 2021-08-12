import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared-service/api-http.service';
import { Area } from '../model/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  urlPart = 'areas'

  constructor(private apiService: ApiHttpService) { }

  getMany(){
   return this. apiService.get<Area[]>(this.urlPart)
  }

  getData(){
    return this.apiService.get<Area>(this.urlPart)
  }

  getOne(id:number){
   return this. apiService.get<Area>(`${this.urlPart}/${id}`)
  }

  save(area: Area){
     return this.apiService.post<Area>(this.urlPart, area)
  }

  update(area: Area){
    return this.apiService.put<Area>(`${this.urlPart}/${area.AreaId}`, area)
  }

  delete(id:number){
   return this.apiService.delete(`${this.urlPart}/${id}`)
  }
}
