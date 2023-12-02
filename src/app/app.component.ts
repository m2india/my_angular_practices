import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularRouting';

  exact: boolean = true;

  constructor(private authServicessss: AuthService){}

  ngOnInit(): void {
    this.authServicessss.autoLogin();
  }

  onLoginClick(){
    // this.authServicessss.loging();
  }

  onLogoutClick(){
    this.authServicessss.logout();
  }
  
}
