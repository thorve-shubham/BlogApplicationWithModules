import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SocketService } from '../services/socket.service';
import { BlogItemComponent } from './blog-item/blog-item.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogService } from '../services/blog.service';



@NgModule({
  declarations: [HomeComponent, ProfileComponent,BlogItemComponent,BlogCreateComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers : [SocketService,BlogService]  
})
export class UserModule { }
