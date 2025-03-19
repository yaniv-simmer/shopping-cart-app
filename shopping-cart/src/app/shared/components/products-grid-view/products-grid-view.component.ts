import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/modules/product.model';

@Component({
  selector: 'app-products-grid-view',
  templateUrl: './products-grid-view.component.html',
  styleUrls: ['./products-grid-view.component.scss']
})
export class ProductsGridViewComponent {
  @Input() products: Product[] = [];
  @Input() buttonType: 'add' | 'remove' | 'none' = 'none';
  @Output() btnClick = new EventEmitter<{ product: Product, index: number }>();


  onBtnClick(product: Product, index: number) {
    this.btnClick.emit({product: product, index: index});
  }
}
