import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlogModel } from 'src/app/sharedModel/blogModel';
import { generate } from 'shortid';
import { BlogService } from 'src/app/services/blog.service';
import * as jwt from 'jwt-decode';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SocketService } from 'src/app/services/socket.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {

  public createBlogFormGroup : FormGroup;
  public blog : BlogModel;
  @Output()
  addBlog : EventEmitter<any>= new EventEmitter();

  constructor(private formBuilder : FormBuilder, private blogService : BlogService,private toastr : ToastrManager,private socketService : SocketService) {
    this.blog = new BlogModel();
   }

  ngOnInit(): void {
    this.blog.author = localStorage.getItem('userName');
    this.blog.userId = jwt(localStorage.getItem('authToken')).Data.userId;
    this.createBlogFormGroup = this.formBuilder.group({
      author : [{value : this.blog.author,disabled : true},[Validators.required]],
      title : [this.blog.title,[Validators.required]],
      topic : [this.blog.topic,[Validators.required]],
      content : [this.blog.content,[Validators.required]],
      tags : [this.blog.tags,[]]
    });
    console.log(this.blog.userId);
  }

  createPost(Data){
    this.blog.blogId = generate();
    this.blog.createdOn = new Date();
    this.blog.title = Data.title;
    this.blog.topic = Data.topic;
    this.blog.content = Data.content;
    this.blog.tags = Data.tags;
    this.blogService.ceratePost(this.blog).subscribe(
      data=>{
        if(!data["error"]){
          this.toastr.successToastr("Post Created Successfully","Success!");
          this.socketService.emitBlog(data["data"]);
          console.log("another emit");
          this.addBlog.emit(data["data"]);
          //this.router.navigate(["user/home"]);
        }
      },
      err=>{
        this.toastr.errorToastr("Something went Wrong","Oops!");
      }
    )
  }
}
