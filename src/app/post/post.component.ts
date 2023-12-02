import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Post } from './post.module';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  
  postForm : FormGroup;
  posts: Post[];
  error: null;

  // constructor( private http: HttpClient){}
  constructor( private postService: PostService){}
  ngOnInit(): void {
    this.postForm = new FormGroup({
      utitle : new FormControl(null, Validators.required),
      ucontent : new FormControl(null, Validators.required)
    });
    this.getPost();
  }

  getPost(){
    // this.http.get
    // <{ [key: string]: Post }>
    // (`https://angularhttp-51e04-default-rtdb.firebaseio.com/post.json`).pipe(
    //   map(
    //     (res: {[key: string]: Post}) => {
    //    let posts: Post[]=[];
    //   for( let key in res){
    //     posts.push({...res[key], key});
    //   }
    //   return posts;
    // })
    // )
    // .subscribe( (res: Post[]) => {
    //  this.posts = res;
    // });

    this.postService.fetchPosts().subscribe( (res) => {
      this.posts = res;
    },
    (error) => {
      console.log(error);
      this.error = error.message;
    }
    )
  }

  onCreatePost(){
    
  //  console.log(this.postForm.value);
  //  const postData = this.postForm.value;
   // console.log("postData",postData);

    // this.http.post<{ name : string }>('https://angularhttp-51e04-default-rtdb.firebaseio.com/post.json', postData).subscribe(
    //   (res) => {
    //     // console.log(res);
    //     this.getPost();
    //   }
    // )

    const postData: Post = this.postForm.value;
    this.postService.createPosts(postData).subscribe((res) => {
      this.getPost();
      console.log("res",res);
      
    },
    (error) => {
      console.log(error);
    }
    );
    
  }

  onClearPosts(event: Event){
    event.preventDefault();
    this.postService.deletePosts();
    this.posts = [];
  }
  

}
