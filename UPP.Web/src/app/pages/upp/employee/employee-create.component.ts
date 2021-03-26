import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss'],
})
export class EmployeeCreateComponent implements OnInit {

  setActiveSE: boolean = true;
  setActiveBE: boolean = false;
  onchangeTab(event: any) {
    switch (event.tabTitle) {
      case 'Employee Registration':
        this.setActiveSE = true;
        break;
      case 'Bulk Employee Registration':
        this.setActiveBE = true;
        break;    
    }
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit() {
  }
}
