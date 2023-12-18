import { Component, OnInit } from '@angular/core';
import { IBasket, IBasketItem } from '../models/basket';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { enviroment } from 'src/environments/enviroment';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  baseUrl = enviroment.apiUrl + "basket";
  constructor(private http : HttpClient ,private basketService : BasketService) {
   
    
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  

}
