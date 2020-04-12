import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public name : string;
  public email : string;
  public password : string;
  public confirmPassword : string;
  public profileForm : FormGroup;
  public userInfo : any;

  constructor(private formbuilder : FormBuilder,private userService : UserService) { }

  ngOnInit(): void {

    this.userInfo = this.userService.getProfileInfo();

    this.name = this.userInfo.name;
    this.email = this.userInfo.email;

    this.profileForm = this.formbuilder.group({
      confirmPassword : [this.confirmPassword,[Validators.required]],
      password : [this.password,[Validators.required,this.validatePassword]]
      
    },{
      validators : this.matchPassword
    })
  }

  matchPassword(control:AbstractControl) {
    const pass = control.get('password').value;
    const cpass = control.get('confirmPassword').value;
    if(pass!=cpass){
      control.get('confirmPassword').setErrors({confirmPassword : true});
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

  updatePassword(Data){
    console.log(Data);
  }
}
