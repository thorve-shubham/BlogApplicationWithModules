import { Injectable } from '@angular/core';
import { BlogModel } from '../sharedModel/blogModel';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private _http : HttpClient,private toastr : ToastrManager, private router : Router,private socketService : SocketService) { }

  ceratePost(blog : BlogModel){
    return this._http.post("http://localhost:3000/blog/create",blog)
  }

  getAllBlogs(){
    console.log("inside service fn");
    return this._http.get("http://localhost:3000/blog/getAll");
  }

  deleteBlog(blogId){
    this._http.delete("http://localhost:3000/blog/delete/"+blogId).subscribe(
      data=>{
        if(data["error"]){
          this.toastr.errorToastr(data["message"],"Oops!");
        }
        else{
          this.socketService.emitDelete(data["data"].blogId);
          this.toastr.errorToastr(data["data"].title+" deleted Successfully","Success!");
          //this.router.navigate(["user/home"]);
        }
      },
      err=>{
        this.toastr.errorToastr("Something went Wrong","Oops!");
      }
    )
  }
}
