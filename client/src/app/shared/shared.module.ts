import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginHeaderComponent } from './pagin-header/pagin-header.component';
import { PaginationComponent } from './pagination/pagination.component';




@NgModule({
  declarations: [
    PaginHeaderComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PaginationModule.forRoot()
  ],
  exports :[
    FontAwesomeModule,
    PaginationModule,
    PaginHeaderComponent,
    PaginationComponent
  ]
  
})
export class SharedModule { }
