import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthTokenInterceptorInterceptor implements HttpInterceptor {

  constructor( private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.userSub.pipe(
      take(1),
      exhaustMap((user) => {
        if(!user){
          return next.handle(request)
        }
        let modifiedReq = request.clone({
          params: request.params.append('auth', user.token)
        })
        return next.handle(request);
      })
    );
  }
}
