import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { Auth2Service } from '../guards/auth2.service';


const routes: Routes = [
  {path:"signIn", component : SignInComponent, canActivate : [Auth2Service]},
  {path:"signUp",component:SignUpComponent, canActivate : [Auth2Service]},
  {path:"", redirectTo:"signIn",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
