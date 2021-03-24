import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { EquityListComponent } from './equity-list.component';

describe('EquityListComponent', () => {
  let component: EquityListComponent;
  let fixture: ComponentFixture<EquityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});