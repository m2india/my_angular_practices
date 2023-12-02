import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, count, filter, map } from 'rxjs';
import { interval } from 'rxjs/internal/observable/interval';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  intervalSubscription: Subscription;
  routeSubscription: Subscription;

  constructor( private route: ActivatedRoute){}

  ngOnInit(): void {
    this.routeSubscription = this.route.data.subscribe((data) => {
      console.log(data);
    });

  //  this.intervalSubscription = interval(1000).subscribe(count => {
  //     console.log(count);
  //   });

    let customerObserval = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);

        if( count > 3){
          observer.error('counter is greater than 3');
        }

        if(count > 1){
          observer.complete();
        }

        count++;
      },1000);
    });

   // this.intervalSubscription = customerObserval.subscribe(data => {
   // this.intervalSubscription = customerObserval.pipe(map( (data: number) => {
    this.intervalSubscription = customerObserval.pipe(
      filter( data => {
        if(data => 0 ){
          return true;
        }
        return true;
      }),
       map( (data: number) => {

      return 'Count is ' + ( data );

   })).subscribe(data => { 
      console.log(data);
    },
      error => {
        console.log(error);
      }, () => {
        console.log('complete');
      }
    )

  }

  ngOnDestroy(){
    this.intervalSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
  

}
