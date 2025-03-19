import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { SharedModule } from 'src/app/shared/components/shared.module';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    SharedModule,
    CartRoutingModule
  ]
})
export class CartModule { }
