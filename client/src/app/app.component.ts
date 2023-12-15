import { Component , OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//implement OnInit tu dong chay k can goi
export class AppComponent{
  title = 'Client';
  faCartShopping = faCartShopping;
  // constructor(private spinnerSevice : NgxSpinnerService){}
  // ngOnInit(): void {
  //   this.spinnerSevice.show();
  //   setTimeout(()=>{
  //     this.spinnerSevice.hide();
  //   },2000);
  // }
}
