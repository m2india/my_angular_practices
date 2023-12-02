import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
// import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken : string;
  email: string;
  refreshToken: string;
  expiresIn:	any;
  localId: string;
  registered? : boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  userSub = new BehaviorSubject<User>(null);
  clearTimeOut : any;

  constructor( private http: HttpClient, private router: Router ) { }

  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkrs3r4apX6uqzkDLr96XzMQfn8leUoDY
    `, { email, password, returnSecureToken: true }
    )
    .pipe(catchError(this.getErrorHandler), 
    tap( this.handleUser.bind(this) )
    );
  }

  login(email : string, password: string){

      return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAkrs3r4apX6uqzkDLr96XzMQfn8leUoDY`, 
        { email, password, returnSecureToken: true }
        ).pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)));

    // return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAkrs3r4apX6uqzkDLr96XzMQfn8leUoDY`,
    // { email, password, returnSecureToken: true }
    // )
    // .pipe(
    //   catchError((errorRes) => {
    //     let errorMessage = 'An Error Occured';    
    //     if(!errorRes.error || !errorRes.error.error){
    //       return throwError(errorMessage)
    //     }
    //     switch(errorRes.error.error.message){
    //       case 'EMAIL_EXISTS': errorMessage = 'Email Already Exists';
    //     }
    //     return throwError(errorMessage)
    //   })
    // );
    
   // this.isLoggedIn = true;
  }

  private handleUser(response: AuthResponseData){

    const expireDate = new Date(
      new Date().getTime() + + response.expiresIn * 1000
    );
    const user = new User(
      response.email, 
      response.localId,
      response.idToken,
      expireDate
    );

    this.userSub.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(+response.expiresIn * 1000);

  }

  getErrorHandler(errorRes: HttpErrorResponse){

    let errorMessage = 'An Error Occured';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS': 
        errorMessage = 'Email Already Exists';
        break;
      case 'EMAIL_NOT_FOUND': 
        errorMessage = 'Email Not Found';
        break;
      case 'INVALID_PASSWORD':
         errorMessage = 'Invalid Password'
         break;
    }
    return throwError(errorMessage);

  }

  autoLogin(){
    let userData: {email: string, _token: string, expirationDate: string, localId: string} = JSON.parse( localStorage.getItem('userData'));
    if(!userData){
      return;
    }

    let user = new User(
      userData.email, 
      userData._token,
      userData.localId,
     new Date( userData.expirationDate ) 
      );

      if(user.token){
        this.userSub.next(user);
      }

      let date = new Date().getTime();
      let expirationDate = new Date(userData.expirationDate).getTime();

      this.autoLogout(expirationDate - date);
  } 

  autoLogout( expirationDate: number ){

   this.clearTimeOut =  setTimeout(() => {
      this.logout();
    }, expirationDate)

  }

  logout(){
   // this.isLoggedIn = false;
    this.userSub.next(null);
    this.router.navigate(['/authComp']);
    localStorage.removeItem('userData');

    if(this.clearTimeOut){
      clearTimeout(this.clearTimeOut);
    }
  }

  isAuthenticated(){
   // return this.isLoggedIn;

   return new Promise((resolve, reject) => {
    setTimeout( () => {
      resolve(this.isLoggedIn);
    }, 1000);
   });
  }
}
