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

  constructor(private authService : AuthenticationService,public route: Router) { }

  ngOnInit(): void {
    this.loggedIn$ = this.authService.isLoggedIn;
  }

  logout(){
    this.authService.logout();
  }

}
