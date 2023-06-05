import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogHomeComponent } from './log-home.component';

describe('LogHomeComponent', () => {
  let component: LogHomeComponent;
  let fixture: ComponentFixture<LogHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
