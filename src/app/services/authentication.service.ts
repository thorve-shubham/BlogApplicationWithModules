import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signUpModel } from '../sharedModel/signUpModel';
import { BehaviorSubject } from 'rxjs';

import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import * as jwt from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private currentUser = new BehaviorSubject<string>(localStorage.getItem('userName'));

  constructor(public _http:HttpClient,public toastr : ToastrManager,public router:Router) {
    console.log("called ser 1");
   }

  get isLoggedIn() {
    return this.loginStatus.asObservable(); 
  }

  get isCurrentUser(){
    return this.currentUser.asObservable();
  }

  signUpUser(userData:signUpModel){
    this._http.post("http://localhost:3000/user/create",userData).subscribe(
      data=>{
        if(data["error"]==null){
          this.toastr.successToastr("User Created Successfully","Done!");
          this.router.navigate(["auth/signIn"]);
        }else{
          this.toastr.errorToastr("User Already Exists","Oops!");
        }
      },
      error=>{
        this.toastr.errorToastr("Something went Wrong","Oops!");
      }
    );
  }

  

  isAuthenticated(){
    const token = localStorage.getItem('authToken');
    console.log('checking auth');
    if(!token){
      //this.toastr.errorToastr("Access Denied","Oops!");
      return false;
    }else{
      try{
        const decoded = jwt(token);
        return true;
      }
      catch(err){
        this.toastr.errorToastr("Invalid Token Provided","Oops!");
        return false;
      }
    }
  }

  login(Data){
    this._http.post("http://localhost:3000/user/login",Data).subscribe(
        data=>{
          if(data["error"]){
            console.log(data);
            console.log('ala');
            this.toastr.errorToastr(data["message"],"Oops!");
            
          }else{
            this.loginStatus.next(true);
            console.log(data['data']);
            console.log('ala');
            localStorage.setItem('authToken',data['data']);
            const decoded = jwt(data['data']);
            //console.log(decoded.Data.name);
            localStorage.setItem('userName',decoded.Data.name);
            this.currentUser.next(decoded.Data.name);
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
    const token = localStorage.getItem('authToken')
    if(token){
      try{
        const decoded = jwt(token);
        return true;
      }catch(err){
        return false;
      }
      
    }
    return false;

  }
  logout(){

    this.loginStatus.next(false);
    this.currentUser.next(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    console.log("alare");
    this.router.navigate(["auth/signIn"]);
    console.log("alare");
  }

  setLogOutStatus(){
    this.loginStatus.next(false);
    this.currentUser.next(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
  }
}
