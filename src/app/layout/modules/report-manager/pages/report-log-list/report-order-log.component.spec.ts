import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOrderLogComponent } from './report-order-log.component';

describe('ReportOrderLogComponent', () => {
  let component: ReportOrderLogComponent;
  let fixture: ComponentFixture<ReportOrderLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportOrderLogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReportOrderLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
