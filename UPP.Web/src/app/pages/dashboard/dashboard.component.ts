
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { SolarData } from '../../@core/data/solar';
import * as $ from 'jquery';
import { FormBuilder, FormGroup } from '@angular/forms';

declare const dashboardStats: any;


interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  //content:number;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

  dateRangeForm: FormGroup;
  startDate: any;
  endDate: any;
  pastDate: any;


  private alive = true;

  solarValue: number;
  EmployeesCard: CardSettings = {
    title: 'Employees',
    iconClass: 'fa fa-user-plus',
    type: 'primary',
    //content: 21
  };
  OperationsCard: CardSettings = {
    title: 'Operations',
    iconClass: 'fa fa-file',
    type: 'success',
    //content: 4

  };
  VehiclesCard: CardSettings = {
    title: 'Vehicles',
    iconClass: 'fa fa-id-card',
    type: 'info',
    //content: 15

  };
  DeliveriesCard: CardSettings = {
    title: 'Deliveries',
    iconClass: 'fa fa-address-card',
    type: 'warning',
    //content: 108
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.EmployeesCard,
    this.OperationsCard,
    this.VehiclesCard,
    this.DeliveriesCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
      default: this.commonStatusCardsSet,
      cosmic: this.commonStatusCardsSet,
      corporate: [
        {
          ...this.EmployeesCard,
          type: 'warning',
        },
        {
          ...this.OperationsCard,
          type: 'primary',
        },
        {
          ...this.VehiclesCard,
          type: 'danger',
        },
        {
          ...this.DeliveriesCard,
          type: 'info',
        },
      ],
      dark: this.commonStatusCardsSet,
    };

  constructor(
    private formBuilder: FormBuilder,
    private themeService: NbThemeService,
    private solarService: SolarData,
    private route: Router) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
  }

  ngOnInit(): void {
    this.dateRangeForm = this.formBuilder.group({
      startDate: [this.pastDate],
      endDate: [new Date()]
    })
    dashboardStats();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getUrlAction(applicationTypeDesc: string) {
    alert(applicationTypeDesc)
    if (applicationTypeDesc == 'Employees') {
      this.route.navigate(['/pages/facilitation/employees']);
    } else if (applicationTypeDesc == 'Operations') {
      this.route.navigate(['/pages/facilitation/#']);
    } else if (applicationTypeDesc == 'Vehicles') {
      this.route.navigate(['/pages/facilitation/#']);
    } else {
      this.route.navigate(['/pages/facilitation/#']);
    }
  }

  getDashboardStats(){

  }

  exportChartsToPdf() {
  
  }
}



