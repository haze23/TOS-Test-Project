import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Cart } from '../../model/cart';
import { BookingService } from '../../service/booking.service';

@Component({
  selector: 'ngx-booking-cart',
  templateUrl: './booking-cart.component.html',
  styleUrls: ['./booking-cart.component.scss']
})
export class BookingCartComponent implements OnInit {

  cart: Cart[] = [];
  
  constructor(private bookService: BookingService,
    private toastrService: NbToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.getBookingDetails();
  }
  source: LocalDataSource = new LocalDataSource(this.cart);
  settings = {
    columns:
    {
      quantity: {
        title: 'Quantity',
        type: 'number',
        editable: false,
      },
      product: {
        title: 'Product Details',
        type: 'string',
        editable: false,
      },
      weight: {
        title: 'Weight',
        type: 'string',
        editable: false,
      },
      // rate: {
      //   title: 'Rate',
      //   type: 'string',
      //   editable: false,
      // },
      tax: {
        title: 'Tax%',
        type: 'number',
        editable: false,
      },
      amount: {
        title: 'Amount',
        type: 'number',
        editable: true
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
    },
    pager: {
      perPage: 10,
    },
  };
  getBookingDetails() {
    this.bookService.getCart().subscribe(data => {
      this.cart = data;
    });
  }

  onCustomAction(event) {

  }

}
