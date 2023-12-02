import { Component, OnInit } from '@angular/core';
import { IDeactiveGuard } from '../services/guard/deactive-guard.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit , IDeactiveGuard {

  ngOnInit(){

  }

  canExit(){
    if(confirm('Are you sure you want to exit')){
      return true;
    }
    
    return false;
  }
}
