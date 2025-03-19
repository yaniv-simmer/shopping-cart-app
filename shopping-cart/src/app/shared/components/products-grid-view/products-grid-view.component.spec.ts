import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsGridViewComponent } from './products-grid-view.component';

describe('ProductsGridViewComponent', () => {
  let component: ProductsGridViewComponent;
  let fixture: ComponentFixture<ProductsGridViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsGridViewComponent]
    });
    fixture = TestBed.createComponent(ProductsGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
