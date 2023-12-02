import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoginInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request.headers);
    
    return next.handle(request).pipe(
      tap((event) => {
        console.log(event);
        console.log('login Response from intercepter');
        if(event.type === HttpEventType.Response)
        {
          console.log(event.body);
          
        }
      }) 
    )
  }
}
