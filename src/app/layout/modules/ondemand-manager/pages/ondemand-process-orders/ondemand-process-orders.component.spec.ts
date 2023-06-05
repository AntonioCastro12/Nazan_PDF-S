import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OndemandProcessOrdersComponent } from './ondemand-process-orders.component';

describe('OndemandProcessOrdersComponent', () => {
  let component: OndemandProcessOrdersComponent;
  let fixture: ComponentFixture<OndemandProcessOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OndemandProcessOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OndemandProcessOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
