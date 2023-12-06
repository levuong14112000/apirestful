import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';



@NgModule({
  // khai báo
  declarations: [
    ShopComponent,
    ProductItemComponent
    
  ],
  // import thư viện
  imports: [
    CommonModule,
    SharedModule

  ],
  // xuất thư viện
  exports : [
    ShopComponent
  ]
})
export class ShopModule { }
