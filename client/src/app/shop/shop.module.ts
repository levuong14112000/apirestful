import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginHeaderComponent } from '../shared/pagin-header/pagin-header.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShopRoute } from './shop.routing';
import { RouterModule } from '@angular/router';



@NgModule({
  // khai báo
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductDetailComponent,
  ],
  // import thư viện
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ShopRoute)
  ],
  // xuất thư viện
  exports : [
    ShopComponent
  ]
})
export class ShopModule { }
