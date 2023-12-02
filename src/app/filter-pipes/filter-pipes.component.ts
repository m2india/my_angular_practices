import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-pipes',
  templateUrl: './filter-pipes.component.html',
  styleUrls: ['./filter-pipes.component.css']
})
export class FilterPipesComponent {

  filterString: string ='';

  appStatus = new Promise((resolve,reject) =>{
    setTimeout( ()=> {
      resolve('Users Data Received');
    }, 3000);
  });

  users = [
    {
      name: "Manimaran",
      joinedDate: new Date(15, 2, 2015)
    },
    {
      name: "Test",
      joinedDate: new Date(14, 12, 2018)
    }
  ];

  onAddUser(){

    console.log("test");
    
    this.users.push({
      name: 'sample',
      joinedDate: new Date(30, 5, 1990)
    });
  }

}
