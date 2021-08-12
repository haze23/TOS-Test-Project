import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {BookingDescriptionEditComponent } from './booking-description-edit.component';

describe('BookingDescriptionEditComponent', () => {
  let component: BookingDescriptionEditComponent;
  let fixture: ComponentFixture<BookingDescriptionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingDescriptionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingDescriptionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
