import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../../../shared-service/api-http.service';
import { AdditionalBilling } from '../model/additional-billing';
import { Booking } from '../model/booking';
import { BookingDescription } from '../model/booking-description';
import { Cart } from '../model/cart';
import { Consignee } from '../model/consignee';
import { Consignor } from '../model/consignor';
import { Delivery } from '../model/delivery';
import { DeliveryDriver } from '../model/delivery-driver';


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  urlPart = 'bookings'
  constructor(private apiService:ApiHttpService) { }

  getConsignees() {
    return this.apiService.get<Consignee[]>(`${this.urlPart}`)
  }

  getConsignee(id: number){
   return this.apiService.get<Consignee>(`${this.urlPart}/${id}`);
  }

  getConsigneeData(){
    return this.apiService.get(this.urlPart)
  }

  saveConsignee(consignee: Consignee) {
    return this.apiService.post<Consignee>(this.urlPart, consignee);
  }
  updateConsignee(consignee: Consignee) {
    return this.apiService.put<Consignee>(`${this.urlPart}?${consignee.consigneeId}`, consignee);
  }

  deleteConsignee(id: number) {
    return this.apiService.delete(`${this.urlPart}/${id}`);
  }

  getConsignors() {
    return this.apiService.get<Consignee[]>(`${this.urlPart}`)
  }

  getConsignor(id: number){
   return this.apiService.get<Consignor>(`${this.urlPart}/${id}`);
  }

  getConsignorsData(){
    return this.apiService.get(this.urlPart)
  }
  saveConsignor(consignor: Consignor) {
    return this.apiService.post<Consignor>(this.urlPart, consignor);
  }
  updateConsignor(consignor: Consignor) {
    return this.apiService.put<Consignor>(`${this.urlPart}?${consignor.consignorId}`, consignor);
  }

  deleteConsignor(id: number) {
    return this.apiService.delete(`${this.urlPart}/${id}`);
  }

  getBooking(id: number){
    return this.apiService.get<Booking>(`${this.urlPart}/${id}`);
   }

  saveBooking(booking: Booking) {
    return this.apiService.post<Booking>(this.urlPart, booking);
  }
  updateBooking(booking: Booking) {
    return this.apiService.put<Booking>(`${this.urlPart}?${booking.bookingId}`, booking);
  }

  deleteBooking(id: number) {
    return this.apiService.delete(`${this.urlPart}/${id}`);
  }


  getTransitGoods(id: number) {
    return this.apiService.get<BookingDescription>(`${this.urlPart}/${id}`);
  }
  saveTransitGoods(bookDescription: BookingDescription) {
    return this.apiService.post<BookingDescription>(this.urlPart, bookDescription);
  }

  updateTransitGoods(bookDescription: BookingDescription) {
    return this.apiService.put<BookingDescription>(`${this.urlPart}?${bookDescription.bookingDescriptionId}`, bookDescription);
  }

  deleteTransitGoods(id: number) {
    return this.apiService.delete(`${this.urlPart}/${id}`);
  }

  getCart() {
    return this.apiService.get<Cart[]>(`${this.urlPart}`)
  }

  getAdditionalBilling(id: number) {
    return this.apiService.get<AdditionalBilling>(`${this.urlPart}`)
  }
  saveAdditionalBilling(additionalBilling: AdditionalBilling) {
    return this.apiService.post<AdditionalBilling>(this.urlPart, additionalBilling);
  }
  updateAdditionalBilling(additionalBilling: AdditionalBilling) {
    return this.apiService.put<AdditionalBilling>(`${this.urlPart}?${additionalBilling.additionalBillingId}`, additionalBilling);
  }

  getDriverUnassignedDelivaries(employeeId: any) {
    return this.apiService.get<DeliveryDriver>(`${this.urlPart}/${employeeId}`);
  }
  saveDeliveryDriver(deliveryDriver: DeliveryDriver) {
    return this.apiService.post<DeliveryDriver>(this.urlPart, deliveryDriver);
  }

  updateDriverDeliveryStatus(deliveryDriver: DeliveryDriver) {
    return this.apiService.put<DeliveryDriver>(`${this.urlPart}?${deliveryDriver.deliveryDriverId}`, deliveryDriver);
  }
  
  getDevelivery(id: number) {
    return this.apiService.get<Delivery>(`${this.urlPart}/${id}`);
  }

  saveDelivery(delivery: Delivery) {
    return this.apiService.post<Delivery>(`${this.urlPart}`, delivery);
  }
  
  updateDelivery(delivery: Delivery) {
    return this.apiService.put<Delivery>(`${this.urlPart}/ ${delivery.deliveryId}`,delivery); 
  }

 
}
