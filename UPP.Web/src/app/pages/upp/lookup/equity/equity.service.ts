import { Injectable } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { ApiHttpService } from '../../../../shared-service/api-http.service';
import { Equity } from '../model/equity';

@Injectable({
  providedIn: 'root',
})

export class EquityService {

  urlPart = 'equity';

  constructor(private apiService: ApiHttpService) { }

  getMany() {
    return this.apiService.get<Equity[]>(this.urlPart);
  }
  getData() {
    return this.apiService.get(this.urlPart);
  }
  getOne(id: number) {

    return this.apiService.get<Equity>(`${this.urlPart}/${id}`);
  }

  save(passportTypes: Equity) {

    return this.apiService.post<Equity>(this.urlPart, passportTypes);
  }

  update(equity: Equity) {
    return this.apiService.put<Equity>(`${this.urlPart}/${equity.equityId}`, equity);
  }

  delete(id: number) {
    return this.apiService.delete(`${this.urlPart}/${id}`);
  }
}
