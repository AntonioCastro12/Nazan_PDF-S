import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportInventoryKardexComponent } from './report-inventory-kardex.component';


describe('ReportInventoryKardexComponent', () => {
  let component: ReportInventoryKardexComponent;
  let fixture: ComponentFixture<ReportInventoryKardexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportInventoryKardexComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReportInventoryKardexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
