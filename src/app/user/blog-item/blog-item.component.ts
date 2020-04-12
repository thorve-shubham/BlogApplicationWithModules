import { Component, OnInit, Input, Output } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { EventEmitter } from '@angular/core';



@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent implements OnInit {

  @Input()
  blog: any;
  @Input()
  userId : string;
  @Output()
  deleteEvent : EventEmitter<string>= new EventEmitter<string>();

  public isOwner : boolean;

  constructor(private blogService : BlogService) { }

  ngOnInit(): void {
    if(this.blog.userId == this.userId){
      this.isOwner = true;
    }else{
      this.isOwner = false;
    }

  }

  delete(){
    this.blogService.deleteBlog(this.blog.blogId);
    //console.log(this.blog)
    this.deleteEvent.emit(this.blog.blogId);
  }

}
