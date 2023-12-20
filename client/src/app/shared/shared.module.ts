import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginHeaderComponent } from './pagin-header/pagin-header.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OrderTotalsComponent } from './order-totals/order-totals.component';




@NgModule({
  declarations: [
    PaginHeaderComponent,
    PaginationComponent,
    OrderTotalsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      positionClass : 'toast-top-right',
      tapToDismiss : true,
      preventDuplicates : true

    }), // ToastrModule added
    PaginationModule.forRoot(),
   
  ],
  exports :[
    FontAwesomeModule,
    PaginationModule,
    PaginHeaderComponent,
    PaginationComponent,
    ToastrModule,
    OrderTotalsComponent
  ]
  
})
export class SharedModule { }
