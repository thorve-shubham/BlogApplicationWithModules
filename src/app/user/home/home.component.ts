import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SocketService } from 'src/app/services/socket.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public blogsFound: boolean;
  public userInfo: any;
  public blogs : Array<any> = [];

  constructor(private socketService: SocketService, private blogService: BlogService, private userService: UserService, private toastr: ToastrManager
  ) {

    console.log("in constructor");
    this.blogService.getAllBlogs().subscribe(
      data => {
        //this.spinner.hide();
        if (data["error"]) {
          console.log("null");
          this.blogsFound = false;
        } else {
          console.log("gotit");
          console.log(data["data"]);
          this.blogsFound = true;
          this.blogs = data["data"];
        }
      },
      err => {
        this.toastr.errorToastr("Error retrieving blogs", "Sorry!")
      }
    );

    this.socketService.getUpdatedBlogs().subscribe(
      data => {
        console.log("got new blog");
        console.log(data);
        this.blogs.push(data);
        console.log(this.blogs);
        this.toastr.infoToastr(data.author + " Posted Something", "Hey!");
      }
    );

    this.socketService.getDeletedBlog().subscribe(
      data => {
        let author, title = ""
        for (let i = 0; i < this.blogs.length; i++) {
          if (this.blogs[i].blogId == data) {
            console.log("showing notification");
            author = this.blogs[i].author;
            title = this.blogs[i].title;
            this.blogs.splice(i, 1);

            if (this.blogs.length < 1) {
              this.blogsFound = false;
            }
            break;
          }
        }
        this.toastr.infoToastr(author + " just deleted post : " + title, "Got Update");
      }
    )

    this.socketService.getNewlyLoggedIN().subscribe(
      data => {
        this.toastr.infoToastr(data, "Info");
      }
    )
  }

  ngOnInit(): void {
    console.log("in oninit");
    this.userInfo = this.userService.getProfileInfo();
  }

  deleteBlog(data) {
    console.log("in home delete");
    for (let i = 0; i < this.blogs.length; i++) {
      if (this.blogs[i].blogId == data) {
        this.blogs.splice(i, 1);
        if (this.blogs.length < 1) {
          this.blogsFound = false;
        }
        break;
      }
    }
  }

  addBlogNow(blog){
    this.blogs.push(blog);
  }

}
