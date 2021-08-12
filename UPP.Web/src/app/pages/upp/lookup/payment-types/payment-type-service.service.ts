import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared-service/api-http.service';
import { PaymentTypes } from '../model/payment-types';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {

  urlPart = 'payment-types'

  constructor(private apiService: ApiHttpService) { }

  getMany(){
    return this.apiService.get<PaymentTypes[]>(this.urlPart);
  }
  getData(){
    return this.apiService.get(this.urlPart);
  }
  getOne(id: number){
   return this.apiService.get<PaymentTypes>(`${this.urlPart}/${id}`);
  }

  save(paymentType: PaymentTypes){
    return this.apiService.post<PaymentTypes>(this.urlPart, paymentType);
  }

  update(paymentType: PaymentTypes){
    return this.apiService.put<PaymentTypes>(`${this.urlPart}/${paymentType.paymentTypesId}`, paymentType);
  }

  delete(id: number){
    return this.apiService.delete(`${this.urlPart}/${id}`)
  }
}
