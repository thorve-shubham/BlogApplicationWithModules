import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket: any;

  constructor() {
    this.socket = io("http://localhost:3000/blogs");
    console.log("socket initiated");
   }

   public emitSmaple(user){
     console.log("Emitting");
     this.socket.emit("sample",user);
   }

   public emitDelete(data){
     this.socket.emit("delete",data);
   }

   public getDeletedBlog(){
     return Observable.create((observer)=>{
       this.socket.on("deleteClient",(blogId)=>{
         observer.next(blogId);
       })
     })
   }

   public getUpdatedBlogs(){
     return Observable.create((observer)=>{
       this.socket.on("newPost",(blog)=>{
         observer.next(blog);
       });
     });
   }
   public emitBlog(blog){
     console.log("emmitting blogN");
     this.socket.emit("post",blog);
   }

   public getNewlyLoggedIN(){
     return Observable.create((observer)=>{
        this.socket.on("new User",(msg)=>{
          observer.next(msg);
        })
     })
   }
}
