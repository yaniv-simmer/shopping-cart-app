import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsGridViewComponent } from './products-grid-view/products-grid-view.component';

@NgModule({
    imports: [
        CommonModule
     ],
    declarations: [
        ProductsGridViewComponent
    ],
    exports: [
        ProductsGridViewComponent
    ]
})
export class SharedModule {}