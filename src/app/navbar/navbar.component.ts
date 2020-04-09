import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn$ : Observable<boolean>;
  public currentUser$ : Observable<string>;

  constructor(private authService : AuthenticationService,public route: Router) { }

  ngOnInit(): void {
    this.loggedIn$ = this.authService.isLoggedIn;
    this.currentUser$ = this.authService.isCurrentUser;
    if(this.loggedIn$){
      this.route.navigate(["user/home"]);
    }
  }

  logout(){
    this.authService.logout();
  }

}
