import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ShopModule } from './shop/shop.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from './middleware/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './middleware/loading.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
    NgxSpinnerModule
  ],
  providers: [
    // handle error
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor , multi : true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor , multi : true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
