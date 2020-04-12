import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';



const routes: Routes = [
  {path:"auth", loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path:"user", loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  {path:"", redirectTo:"auth/signIn", pathMatch:"full"}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
