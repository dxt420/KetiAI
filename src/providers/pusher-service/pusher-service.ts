import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare const Pusher: any;
@Injectable()
export class PusherServiceProvider {
  public _pusher : any;
  constructor(public http: HttpClient) {
    this._pusher = new Pusher("7e68e39c122f6cbf6b79", {
      cluster: "mt1",
      encrypted: true
    });
  }

  getPusher(){
    return this._pusher;
  }
}
