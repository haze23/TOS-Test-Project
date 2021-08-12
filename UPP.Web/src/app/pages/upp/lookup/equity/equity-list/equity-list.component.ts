import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EquityService } from '../equity.service';
import { Equity } from '../../model/equity';



@Component({
    selector: 'ngx-equity-list',
    templateUrl: './equity-list.component.html',
    styleUrls: ['./equity-list.component.scss'],
  })

export class EquityListComponent implements OnInit {
   equities: Equity[] = [];
   equity: Equity = new Equity();
   source: LocalDataSource = new LocalDataSource(this.equities);
   settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns:
    {
      equityId: {
        title: 'ID',
        type: 'number',
      },
      equityCode: {
        title: 'Code',
        type: 'string',
      },     
      equityDesc: {
        title: 'Desc',
        type: 'string',
      },
    },
    pager: {
      perPage: 10,
    },
  }; 
  constructor(
    private equityService: EquityService,
    private toastrService: NbToastrService,
    private router: Router) { }

    ngOnInit() {
      this.getEquities();
    }

    addRecord(event) {
        this.equity.equityDesc = event.newData.equityDesc;
        this.equity.equityCode = event.newData.equityCode;
        this.equityService.save(this.equity).subscribe(
          res => {
            event.confirm.resolve(event.newData);
            this.toastrService.success('Record saved successfully.', 'UPP');
            this.getEquities();
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              this.toastrService.danger('Error saving record. Please contact your UPP administrator', 'UPP');
            } else {
              this.toastrService.danger('Error saving record. Please contact your UPP administrator', 'UPP');
            }
          });
      }
      updateRecord(event) {
        this.equity.equityDesc = event.newData.equityDesc;
        this.equity.equityCode = event.newData.equityCode;
        this.equity.equityId = +event.newData.equityId;
    
        this.equityService.update(this.equity).subscribe(
          res => {
            event.confirm.resolve(event.newData);
            this.toastrService.success('Record saved successfully.', 'UPP');
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              this.toastrService.danger('Error saving record. Please contact your UPP administrator', 'UPP');
            } else {
              this.toastrService.danger('Error saving record. Please contact your UPP administrator', 'UPP');
            }
          });
      }

      deleteRecord(event) {
        if (window.confirm('Are you sure you want to delete this record?')) {  
          this.equity.equityId = event.data.equityId;  
          this.equityService.delete(this.equity.equityId).subscribe(
            res => {
            event.confirm.resolve(event.newData);
            this.toastrService.success('Record deleted successfully.', 'UPP');
            this.getEquities();
          },
           (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              this.toastrService.danger('Error deleting record. Please contact your UPP administrator', 'UPP');
            } else {
              this.toastrService.danger('Error deleting record. Please contact your UPPadministrator', 'UPP');
            }
          });    
        } else {
          event.confirm.reject();
        }
      }

    getEquities() {
        this.equityService.getData().subscribe((data: Equity[]) => {
            this.equities = data;
            this.source.load(data);
            console.log(data);
        })
    }

}