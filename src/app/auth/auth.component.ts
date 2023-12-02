import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  // authForm: NgForm;

  constructor(private authService: AuthService, private router: Router){}

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onFormSubmit(authForm: NgForm)
  {
   // console.log(authForm.value);

    if(!authForm.valid){
      return;
    }
  
    this.isLoading = true;
    this.error = null;
    
    let authObs: Observable<AuthResponseData>;

    if(this.isLoginMode)
    {
      authObs = this.authService.login(
        authForm.value.email,
        authForm.value.password
      );
    } else {
      authObs = this.authService.signUp(
        authForm.value.email,
        authForm.value.password
      );
    }

    // next: async (response) => {
    //   console.log("response----", response);
    //   this.isLoading = false;
    //   this.router.navigate(['/']);
    // }, 
    // error: (errorMessage) => {
    //   console.log("error--res");
    //   this.error = errorMessage;
    //   this.isLoading = false;
    // }

    authObs.subscribe(
      (response) => {
        console.log("response----", response);
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      (errorMessage) => {
        console.log("error--res");
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    
  }

  // getPasswordErrors(password: FormControl){
  //   if(password.errors['required'])
  //   {
  //     return 'Password Required';
  //   }
  //   if(password.errors['minlength']){
  //     return 'Password is 6 characters';
  //   }
  // }
}
