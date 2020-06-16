import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrductdetailsComponent } from './prductdetails.component';

describe('PrductdetailsComponent', () => {
  let component: PrductdetailsComponent;
  let fixture: ComponentFixture<PrductdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrductdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrductdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
