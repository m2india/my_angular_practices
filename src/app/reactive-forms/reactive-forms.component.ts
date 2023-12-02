import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

  restrictedName = ['Leela'];
  genders = ['male','female'];
  signUpForm: FormGroup;

  get hobbyControls(){
    return (<FormArray>this.signUpForm.get('hobbies')).controls
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'userData' : new FormGroup({
        'username': new FormControl(null, [Validators.required, this.isRestrictedName.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.isRestrictEmail),
      }),
      'gender': new FormControl('female'),
      'hobbies': new FormArray([])
    });

    //valueChanges // statusChanges
    this.signUpForm.statusChanges.subscribe(value => {
      console.log(value);
    });

    this.signUpForm.setValue({
      userData: {
        username : "Manimaran",
        email : "test@gmail.com",
      },
      gender : "Male",
      hobbies: []
    })

  }

  onSubmit(){
    console.log(this.signUpForm);
  }

  isRestrictedName(control: FormControl):{ [s: string]: boolean}{
    if(this.restrictedName.includes(control.value)){
      return {nameIsRestricted: true}
    }
    return null;
  }

  isRestrictEmail(control: FormControl): Promise<any> | Observable<any> {
    let promise = new Promise((resolve,reject) => {
      setTimeout(() => {
        if(control.value === 'test@gmail.com'){
          resolve({emailRestricted: true});
        } else {
          resolve(null);
        }
      }, 2000);
    });

    return promise;
  }

  onAddHobby(){
    const control = new FormControl(null, [Validators.required]);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

}
