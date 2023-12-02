import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../post/post.module';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { pipe } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts: Post[];
  
  constructor( private http: HttpClient, private authService: AuthService) { }

  

  fetchPosts() {
    
    return this.authService.userSub.pipe(
      take(1),
      switchMap((user) => {

        let searchParams = new HttpParams();
        searchParams = searchParams.append('auth',user.token);

        return this.http
        .get<{ [key: string]: Post }>(
          `https://angularhttp-51e04-default-rtdb.firebaseio.com/post.json`,{
            params: searchParams
          }
        )
        .pipe(
            map((response) => {
              let posts: Post[] = [];
              for (let key in response) {
                posts.push({ ...response[key], key });
              }
              return posts;
            })
          );
      }),

        // .pipe(
        //     map((response) => {
        //       let posts: Post[] = [];
        //       for (let key in response) {
        //         posts.push({ ...response[key], key });
        //       }
        //       return posts;
        //     })
        //   );

        map((response) => {
          let posts: Post[] = [];
          for (let key in response) {
            posts.push({ ...response[key], key });
          }
          return posts;
        })
    );
  }

  createPosts(postData : Post){
    // console.log("postData",postData);
  return  this.http.post<{ name : string }>('https://angularhttp-51e04-default-rtdb.firebaseio.com/post.json', postData, {
    headers: new HttpHeaders({
      'Customer-header' : 'creat Manitest',
    }),
    observe: 'body',  
    // observe: 'response',
  });
  // .subscribe(
  //     (res) => {
  //       // console.log(res);
  //       this.fetchPosts();
  //     }
  //   )
  }

  deletePosts(){
    // console.log("postData",postData);
  return  this.http.delete('https://angularhttp-51e04-default-rtdb.firebaseio.com/post.json',{
    observe: 'events',
    responseType: 'text',
  }).pipe(tap(res => {
    //console.log(res);
    if(res.type === HttpEventType.Sent){
      console.log("request sent");
    }

    if(res.type === HttpEventType.Response){
      console.log(res.body);
      
    }
    
  })).subscribe( (res) => {
   // console.log(res);
  });
  
  }
}
