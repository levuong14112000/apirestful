import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginHeaderComponent } from './pagin-header/pagin-header.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';




@NgModule({
  declarations: [
    PaginHeaderComponent,
    PaginationComponent
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
    ToastrModule
  ]
  
})
export class SharedModule { }
