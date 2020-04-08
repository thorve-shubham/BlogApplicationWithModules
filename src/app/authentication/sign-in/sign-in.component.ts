import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies'; 
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public signInFormGroup : FormGroup;
  public email : string;
  public password : string;

  constructor(
        public formBuilder : FormBuilder,private authService : AuthenticationService,public toastr : ToastrManager,
        public router : Router
    ) { }

  ngOnInit(): void {
    this.signInFormGroup = this.formBuilder.group({
      email : [this.email,[Validators.required,Validators.email]],
      password : [this.password,Validators.required]
    });
  }

  login(Data){
    this.authService.login(Data);
    // this.authService.login(Data).subscribe(
    //   data=>{
    //     if(data["error"]){
    //       console.log(data);
    //       console.log('ala');
    //       this.toastr.errorToastr(data["message"],"Oops!");
          
    //     }else{
    //       this.authService.setLoginStatus(true);
    //       console.log(data);
    //       console.log('ala');
    //       Cookie.set('authToken',data["data"]);
    //       this.toastr.successToastr("Login Successful","Success!");
    //       setTimeout(()=>{
    //         this.router.navigate(["user/home"]);
    //       },1000);
    //     }
    //   },
    //   err=>{
    //     console.log('ala');
    //     this.toastr.errorToastr("Something went Wrong","Oops!");
    //   }
    // );
  }

}
