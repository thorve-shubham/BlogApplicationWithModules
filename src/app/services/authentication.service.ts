import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signUpModel } from '../sharedModel/signUpModel';
import { BehaviorSubject } from 'rxjs';
import { Cookie } from 'ng2-cookies';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());

  constructor(public _http:HttpClient,public toastr : ToastrManager,public router:Router) { }

  get isLoggedIn() {
    return this.loginStatus.asObservable(); 
  }

  setLoginStatus(status:boolean){
    this.loginStatus.next(status);
    console.log("setting status"+status);
  }

  signUpUser(userData:signUpModel){
    return this._http.post("http://localhost:3000/user/create",userData);
  }

  login(Data){
    //this.loginStatus.next(true);
    this._http.post("http://localhost:3000/user/login",Data).subscribe(
        data=>{
          if(data["error"]){
            console.log(data);
            console.log('ala');
            this.toastr.errorToastr(data["message"],"Oops!");
            
          }else{
            this.loginStatus.next(true);
            console.log(data);
            console.log('ala');
            Cookie.set('authToken',data["data"]);
            this.toastr.successToastr("Login Successful","Success!");
            setTimeout(()=>{
              this.router.navigate(["user/home"]);
            },1000);
          }
        },
        err=>{
          console.log('ala');
          this.toastr.errorToastr("Something went Wrong","Oops!");
        }
      );
    
  }

  checkLoginStatus(){
    console.log("checkng status");
    if(Cookie.get('authToken')){
      console.log("true");
      return true;
    }
    else{
      console.log("fasle");
      return false;
    }

  }
  logout(){
    Cookie.deleteAll();
    this.loginStatus.next(false);
    
  }
}
