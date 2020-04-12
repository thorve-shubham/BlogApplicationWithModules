import { Injectable } from '@angular/core';
import * as jwt from 'jwt-decode';
import { decode } from 'punycode';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public toastr : ToastrManager) { }

  getProfileInfo(){
    const token = localStorage.getItem('authToken');
    try{
      const decoded = jwt(token);
      return({
        userId : decoded.Data.userId,
        name : decoded.Data.name,
        email : decoded.Data.email
      });
    }catch(err){
      this.toastr.errorToastr("Token is Invalid/Expired","Oops!");
    }
  }
}
