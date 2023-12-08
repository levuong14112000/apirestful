import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagin-header',
  templateUrl: './pagin-header.component.html',
  styleUrls: ['./pagin-header.component.css']
})
export class PaginHeaderComponent {
  //import du lieu tu cha
   @Input() pageNumber = 1;
   @Input() pageSize = 3;
   @Input() totalCount = 0;

}
