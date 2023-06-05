import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OndemandCloseOrdersComponent } from './ondemand-close-orders.component';

describe('OndemandCloseOrdersComponent', () => {
  let component: OndemandCloseOrdersComponent;
  let fixture: ComponentFixture<OndemandCloseOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OndemandCloseOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OndemandCloseOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
