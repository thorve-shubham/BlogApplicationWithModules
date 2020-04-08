import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationService } from '../services/authentication.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SignUpComponent, SignInComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,FormsModule,ReactiveFormsModule
  ],
  providers:[AuthenticationService]
})
export class AuthenticationModule { }
