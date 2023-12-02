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
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Sending--- Request Interceptor');
    let modifiRequest = request.clone({
      // headers: request.headers.append('auth', 'abc'),
      // params: request.params.append('hello', 'hello world'),
    });
    return next.handle(modifiRequest);

    // return next.handle(modifiRequest).pipe(
    //   tap((event) => {
    //     console.log(event);
    //     console.log('Response from intercepter');
    //     if(event.type === HttpEventType.Response)
    //     {
    //       console.log(event.body);
          
    //     }
    //   }) 
    // )
  }
}
