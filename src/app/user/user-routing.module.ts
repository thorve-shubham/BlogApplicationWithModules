import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from '../guards/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';



const routes: Routes = [
  {path:"home", component : HomeComponent, canActivate: [AuthGuardService]},
  {path: "profile", component:ProfileComponent,canActivate : [AuthGuardService]},
  {path : "createBlog" , component : BlogCreateComponent}
  //{path: "**" , redirectTo:"auth/signIn" , pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
