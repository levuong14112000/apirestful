import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router : Router,private toast : ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if(err){
          if(err.status === 400){
            if(err.error.errors){ //validation error
              console.log(err);
              throw err.error.errors;
            }
            else{  //badrequest error
              this.toast.error(err.error.message, err.error.statusCode);
            }
          }

          if(err.status === 404){
            //navigateByUrl == redirectByUrl
            this.router.navigateByUrl('/test-error/not-found');
          }
          if(err.status === 500){
            let navigationExtras : NavigationExtras = {
              state : {error : err.error}
            };
            this.router.navigateByUrl('/test-error/server-error',navigationExtras);
          }
        }
        return throwError(err);
      })
    );
  }
}
