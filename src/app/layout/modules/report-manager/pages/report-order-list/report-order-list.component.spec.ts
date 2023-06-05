import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOrderListComponent } from './report-order-list.component';

describe('ReportOrderListComponent', () => {
  let component: ReportOrderListComponent;
  let fixture: ComponentFixture<ReportOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportOrderListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReportOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
