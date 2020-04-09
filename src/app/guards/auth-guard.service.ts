import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService : AuthenticationService,public router : Router) { }
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    console.log('in guard');
    if(this.authService.isAuthenticated()){
      return true;
    }else{
      this.router.navigate(["auth/signIn"]);
      return false;
    }

  }
}
