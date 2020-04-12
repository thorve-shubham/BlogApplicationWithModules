import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class Auth2Service implements CanActivate {

  constructor(private authService : AuthenticationService, private router : Router) { }

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
      if(!this.authService.isAuthenticated()){
        this.authService.setLogOutStatus();
        return true;
      }else{
        this.router.navigate(["user/home"]);
        return false;
      }
  }

  
}
