import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent {

  gender = 'male';


  submitted = false;

  user = {
    username: '',
    useremail: '',
    gender: ''
  };

  @ViewChild('f') signUpForm: NgForm;

  onFormSubmit(){
    //console.log(this.signUpForm);
    this.submitted = true;
    this.user.username = this.signUpForm.value.userData.username;

    this.signUpForm.reset();
  }

  fillValue(){

    this.signUpForm.form.patchValue({
      userData: {
        useremail: "Manitest@gmail.com",
        username: "Maniusername",
      },
      gender : "Female"
    });
  }
}
