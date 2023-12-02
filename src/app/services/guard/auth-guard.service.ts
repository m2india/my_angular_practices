import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private authServices: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ): boolean | Promise<boolean> |Observable<boolean>
    {

      //var isLoggedInCheck = this.authServicesFile.isAuthenticated();

      // if(isLoggedInCheck){
      //   return true;
      // }
      // else{
      //   this.router.navigate(['/']);
      //   return false;
      // }

      // return true;

      return this.authServices.isAuthenticated().then((data) => {

        if(data){
          return true;
        }else{
          this.router.navigate(['/']);
          return false;
        }
      })
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //throw new Error('Method not implemented.');
    return this.canActivate(childRoute,state);
  }

}
