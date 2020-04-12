import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { signUpModel } from '../../sharedModel/signUpModel';
import { generate } from 'shortid';

import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public signUpFormGroup : FormGroup;
  public signUpData : signUpModel;
  public cPassword :string;
  

  constructor(public formBuilder : FormBuilder,public authService:AuthenticationService,public toastr: ToastrManager) { 
    this.signUpData = new signUpModel();
  }

  ngOnInit(): void {


    this.signUpFormGroup = this.formBuilder.group({
      name :[this.signUpData.name,Validators.required],
      email : [this.signUpData.email,[Validators.required,Validators.email]],
      password : [this.signUpData.password, [Validators.required,this.validatePassword]],
      confirmPassword : [this.cPassword,[Validators.required]]
    },
    {
      validators : this.matchPassword
    });
  }

  matchPassword(control:AbstractControl){
    let password = control.get('password').value;
    let cPassword = control.get('confirmPassword').value;
    if(password!=cPassword){
      control.get('confirmPassword').setErrors({confirmPassword : true})
    }else{
      return null;
    }
  }

  validatePassword(control:AbstractControl){
    if(!control.value){
      return null;
    }else{
      const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
      const valid = regex.test(control.value);
      console.log(control.value);
      return valid ? null : { invalidPassword : true };
    }
  }

  

  createUser(Data){
    Data.userId = generate();
    this.authService.signUpUser(Data);
  }

}