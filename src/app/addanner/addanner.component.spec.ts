import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddannerComponent } from './addanner.component';

describe('AddannerComponent', () => {
  let component: AddannerComponent;
  let fixture: ComponentFixture<AddannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
