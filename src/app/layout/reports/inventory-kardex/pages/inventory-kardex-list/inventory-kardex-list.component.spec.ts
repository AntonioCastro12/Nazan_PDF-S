import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryKardexListComponent } from './inventory-kardex-list.component';

describe('InventoryKardexListComponent', () => {
  let component: InventoryKardexListComponent;
  let fixture: ComponentFixture<InventoryKardexListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryKardexListComponent]
    });
    fixture = TestBed.createComponent(InventoryKardexListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
