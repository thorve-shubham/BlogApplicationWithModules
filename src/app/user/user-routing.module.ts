import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from '../guards/auth-guard.service';


const routes: Routes = [
  {path:"home", component : HomeComponent,canActivate : [AuthGuardService]},
  {path: "**" , redirectTo:"auth/home" , pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
