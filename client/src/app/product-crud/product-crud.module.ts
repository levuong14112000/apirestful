import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { RouterModule } from '@angular/router';

import { InsertComponent } from './insert/insert.component';
import { UpdateComponent } from './update/update.component';
import { ProductCrudRoutes } from './product-crud.routing';
import { ProductCrudComponent } from './product-crud.component';
import { ShopComponent } from '../shop/shop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  // khai báo
  declarations: [
    InsertComponent,
    UpdateComponent,
    ProductCrudComponent
  ],
  // import thư viện
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(ProductCrudRoutes),
  ],
  // xuất thư viện
  exports : [
    ProductCrudComponent
  ]
})
export class ProductCrudModule { }
