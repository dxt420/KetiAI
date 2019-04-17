// import { Injectable } from '@angular/core';

// import { Item } from '../../models/item';
// import { Api } from '../api/api';

// @Injectable()
// export class Items {

//   constructor(public api: Api) { }

//   query(params?: any) {
//     return this.api.get('/items', params);
//   }

//   add(item: Item) {
//   }

//   delete(item: Item) {
//   }

// }





import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Remember to import RxJs dependencies.
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/defer';
import 'rxjs/add/operator/delay';
// Interface for the data returned by the JSONPlaceholder API
export interface Placeholder {
  userId: number;
  id: number;
  title: string;
  body: string;
}
@Injectable()
export class PlaceholderProvider {
  constructor(private http: HttpClient) {}
  public random(): Observable<Placeholder> {
    // Observable.defer makes sure we generate a 
    // random number each time the Observable is triggered.
    return Observable.defer(() => {
      const randIndex = Math.ceil(Math.random() * 10); // 0-10
      const url = 'https://jsonplaceholder.typicode.com/posts/' 
        + randIndex;
      return this.http.get<Placeholder>(url).delay(1000);
    });
  }
}