import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { LookupsService } from '../../../lookup/lookups.service';
import { Booking } from '../../model/booking';
import { BookingService } from '../../service/booking.service';
import * as $ from 'jquery';
import { ConsigneeEditComponent } from '../../consignee/consignee-edit/consignee-edit.component';
import { ConsignorEditComponent } from '../../consignor/consignor-edit/consignor-edit.component';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Consignor } from '../../model/consignor';

declare const bkPanels: any;
declare var $: any

@Component({
  selector: 'ngx-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.scss']
})
export class BookingEditComponent implements OnInit {

  bookingForm: FormGroup;
  booking: Booking = new Booking();
  consignors: [];
  consignees: [];
  locations: [];
  selected: [number, string];
  consignorSettings = {};
  consigneeSettings = {};


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private bookService: BookingService,
    private lookupService: LookupsService,
    private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.consignorSettings = {
      singleSelection: true,
      text: 'Select consigner',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      lazyLoading: true,
    };
    this.consigneeSettings = {
      singleSelection: true,
      text: 'Select consignee',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      lazyLoading: true,
    };
    this.loadLookups();


    let id = this.route.snapshot.paramMap.get('id');
    this.bookingForm = this.formBuilder.group({
      bookingNo: ['', Validators.required],
      consignorId: [0, Validators.required],
      consigneeId: [0, Validators.required],
      fromLocationId: [0, Validators.required],
      toLocationId: [0, Validators.required],
      bookingDate: [new Date(), Validators.required],
      requiredDate: [new Date(), Validators.required],
      createdDate: [new Date(), Validators.required]

    })
    bkPanels();

    if (id) {
      this.PopulateForm(+id)
    }
  }

  PopulateForm(id: number) {
    this.bookService.getBooking(id).subscribe(type => {
      this.booking = type;

      this.bookingForm.setValue({
        bookingId: type.bookingId,
        bookingNo: type.bookingNo,
        consignorId: type.consignorId,
        consigneeId: type.consigneeId,
        bookingDate: type.bookingDate,
        requiredDate: type.requiredDate,
        createdBy: type.createdBy,
        createdDate: type.createdDate,
      })
    })
  }

  onSubmit() {
    const formValue = this.bookingForm.value;
    this.booking.bookingNo = formValue.bookingNo;
    this.booking.bookingId = formValue.bookingId,
      this.booking.consigneeId = formValue.consigneeId;
    this.booking.bookingDate = formValue.bookingDate;
    this.booking.requiredDate = formValue.requiredDate;
    this.booking.createdBy = formValue.createdBy;
    this.booking.createdDate = formValue.createdDate;


    if (this.booking.bookingId > 0) {
      this.bookService.updateBooking(this.booking).subscribe(data => {
        this.toastrService.success('Record saved successfully.');
        this.router.navigate([''])
      }, error => {
        this.toastrService.danger('Error occured in saving the record.')
      })
    } else {
      this.bookService.saveBooking(this.booking).subscribe((data: {}) => {
        this.toastrService.success('booking saved successfully')
        this.router.navigate([''])
      })
    }
  }

  onCancel() {
    this.booking.bookingNo = '';
    this.booking.consignorId = 0;
    this.booking.consigneeId = 0;
    this.booking.bookingDate = new Date();
    this.booking.requiredDate = new Date();
    this.booking.createdBy = '';
    this.booking.createdDate = new Date();
  }

  loadLookups() {
    this.lookupService.getConsignors().subscribe(
      res => {
        this.consignors = res as [];
      }
    )
    this.lookupService.getConsignees().subscribe(
      res => {
        this.consignees = res as [];
      }
    )

    this.lookupService.getLocations().subscribe(
      res => {
        this.locations = res as [];
      }
    )

  }

  iconEffect() {
    $(".enlarged-icon-style ").css({ color: 'red' });
  }
  addConsigneeModal() {
    //const providerId = 82;
    this.dialogService.open(ConsigneeEditComponent,
      {
        // context: {
        //   providerId: providerId,
        // },
        closeOnBackdropClick: false,
      });
  }
  addConsignorModal() {
    this.dialogService.open(ConsignorEditComponent,
      {
        closeOnBackdropClick: false,
      });
  }


  // private filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.consignors.filter(e => e[''].toLowerCase().includes(filterValue));

  // }

  // getFilteredOptions(value: string): Observable<[number,string]> {
  //   return of(value).pipe(
  //     map(filterString => this.filter(filterString)),
  //   );
  // }
  
  // onChange() {
  //   var value = this.getFilteredOptions(this.input.nativeElement.value);
  // }

  // onSelectionChange($event) {
  // var value = this.getFilteredOptions($event);
  // }

}
