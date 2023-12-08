import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShopComponent } from 'src/app/shop/shop.component';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent {
   @Input() totalCount = 0;
   @Input() pageSize = 6;
   @Output() newPageNumber = new EventEmitter<number>();
   onPagerChanged(event : any){
    this.newPageNumber.emit(event.page)
  }
}


